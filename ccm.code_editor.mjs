/**
 * @overview Reusable CodeMirror 6 editor with Shadow DOM support.
 * @author André Kless <andre.kless@web.de>
 * @copyright 2023–2026 André Kless
 * @license MIT
 * @version 2.0.0
 */
export const component = {
  name: "code_editor",
  ccm: "././libs/framework/ccm-28.0.0.min.js",
  config: {
    ui: ["ccm.load", "././libs/ccm-ui/ccm-ui-1.0.0.min.mjs"],
    views: ["ccm.load", "././resources/views.mjs"],
    css: ["ccm.load", "././resources/styles.css"],
    codemirror: "././libs/codemirror/codemirror-6.min.mjs",

    // value is the current plain-text content, also before start() or after destroy().
    value: "",
    language: "text",
    label: "",
    ariaLabel: "Code editor",
    theme: "light",
    height: "360px",
    fontSize: "14px",
    tabSize: 4,
    indentWithTabs: false,
    lineNumbers: true,
    lineWrapping: false,
    readOnly: false,
    folding: true,
    closeBrackets: true,
    autocompletion: true,
    autofocus: false,

    // Called for changes, including setValue(). Payload: { app, value, origin: "user" | "api" }.
    // onchange: ({ app, value, origin }) => {},
  },
  Instance: function () {
    let editor;
    let cm;

    this.init = async () => {
      // Native import preserves CodeMirror's class instances, which ccm.load would clone.
      cm = await import(this.codemirror);
    };

    /** Creates or recreates the editor using the current value and configuration. */
    this.start = async () => {
      // Validate before replacing an existing, working editor.
      validateOptions(this);
      this.destroy();
      this.ui.render(this.views.main(this), this.element, this);
      const parent = this.element.querySelector(".code-editor-mount");
      const nodeRoot = parent.getRootNode();
      const root = nodeRoot.nodeType === 9 || nodeRoot.host ? nodeRoot : parent.ownerDocument;
      editor = createEditor({
        parent,
        root,
        options: this,
        onChange: (value, origin) => {
          this.value = value;
          this.onchange?.({ app: this, value, origin });
        },
      });
      if (this.autofocus) editor.focus();
    };

    /** Returns the plain-text document with LF line endings, never HTML or a parsed object. */
    this.getValue = () => editor ? editor.getValue() : this.value;

    /** Replaces the document, clearing history and diagnostics. Works before start(). */
    this.setValue = (value, { notify = true } = {}) => {
      if (typeof value !== "string") throw new TypeError("value must be a string");
      if (editor) {
        editor.setValue(value, { notify });
        this.value = editor.getValue();
      } else {
        const changed = this.value !== value;
        this.value = value;
        if (changed && notify) this.onchange?.({ app: this, value, origin: "api" });
      }
    };

    /** Shows externally supplied diagnostics (one-based line/column); [] clears them. */
    this.setDiagnostics = (diagnostics) => {
      if (!editor) throw new Error("Call start() before setDiagnostics()");
      editor.setDiagnostics(diagnostics);
    };

    this.focus = () => editor?.focus();

    /** Call before permanently removing an instance. Keeps the current value. */
    this.destroy = () => {
      if (!editor) return;
      this.value = editor.getValue();
      editor.destroy();
      editor = undefined;
    };

    /** Creates one CodeMirror view with its own state and settings. */
    function createEditor({ parent, root, options, onChange }) {
      const languageSupport = {
        text: () => [],
        java: () => cm.java(),
        javascript: () => cm.javascript(),
        typescript: () => cm.javascript({ typescript: true }),
        html: () => cm.html(),
        css: () => cm.css(),
        json: () => cm.json(),
        python: () => cm.python(),
      };
      // Copy settings: changes to the ccm instance only take effect at the next start().
      const settings = { ...options };
      let hasDiagnostics = false;
      let destroyed = false;
      let diagnosticGeneration = 0;
      const extensions = [
        languageSupport[settings.language](),
        cm.history(),
        cm.drawSelection(),
        cm.dropCursor(),
        cm.highlightSpecialChars(),
        cm.rectangularSelection(),
        cm.indentOnInput(),
        cm.bracketMatching(),
        cm.highlightSelectionMatches(),
        cm.syntaxHighlighting(cm.defaultHighlightStyle, { fallback: true }),
        cm.EditorState.tabSize.of(settings.tabSize),
        cm.indentUnit.of(settings.indentWithTabs ? "\t" : " ".repeat(settings.tabSize)),
        cm.EditorState.readOnly.of(settings.readOnly),
        cm.EditorView.editable.of(!settings.readOnly),
        // A read-only editor stays focusable, searchable and selectable for copying.
        cm.EditorView.contentAttributes.of({
          "aria-label": settings.ariaLabel || settings.label || "Code editor",
          "aria-readonly": String(settings.readOnly),
          tabindex: "0",
          spellcheck: "false",
        }),
        cm.EditorView.theme({
          "&": {
            height: settings.height,
            fontSize: settings.fontSize,
            border: "1px solid #b8c3cf",
            borderRadius: "8px",
          },
          "&.cm-focused": { outline: "2px solid #4779b8", outlineOffset: "2px" },
          ".cm-scroller": {
            overflow: "auto",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            lineHeight: "1.6",
          },
          ".cm-content": { padding: "12px 0" },
          ".cm-line": { padding: "0 12px" },
          ".cm-gutters": { borderRadius: "8px 0 0 8px" },
          ".cm-tooltip": { fontSize: "13px" },
        }),
        cm.keymap.of([
          ...cm.defaultKeymap,
          ...cm.historyKeymap,
          ...cm.searchKeymap,
          ...cm.lintKeymap,
          ...(settings.closeBrackets ? cm.closeBracketsKeymap : []),
          ...(settings.autocompletion ? cm.completionKeymap : []),
          ...(settings.folding ? cm.foldKeymap : []),
          // CodeMirror's Escape, Tab escape hatch keeps keyboard focus accessible.
          cm.indentWithTab,
        ]),
        cm.EditorView.updateListener.of((update) => {
          if (!update.docChanged) return;
          if (hasDiagnostics) {
            hasDiagnostics = false;
            const generation = diagnosticGeneration;
            // Dispatch after this update, but never clear newer diagnostics or a new document.
            queueMicrotask(() => {
              if (!destroyed && !hasDiagnostics && diagnosticGeneration === generation)
                view.dispatch(cm.setDiagnostics(view.state, []));
            });
          }
          onChange(update.state.doc.toString(), "user");
        }),
      ];
      if (settings.lineNumbers) extensions.push(cm.lineNumbers(), cm.highlightActiveLineGutter());
      if (settings.lineWrapping) extensions.push(cm.EditorView.lineWrapping);
      if (settings.folding) extensions.push(cm.foldGutter());
      if (settings.closeBrackets) extensions.push(cm.closeBrackets());
      if (settings.autocompletion) extensions.push(cm.autocompletion());
      if (!settings.readOnly) extensions.push(cm.highlightActiveLine());
      extensions.push(cm.lintGutter());
      if (settings.theme === "dark") extensions.push(cm.oneDark);

      const makeState = (value) => cm.EditorState.create({ doc: value, extensions });
      const view = new cm.EditorView({ parent, root, state: makeState(settings.value) });

      return {
        getValue: () => view.state.doc.toString(),
        setValue(value, { notify = true } = {}) {
          const changed = value !== view.state.doc.toString();
          hasDiagnostics = false;
          diagnosticGeneration++;
          // A replacement is a new document; undo must never restore the previous exercise.
          view.setState(makeState(value));
          if (changed && notify) onChange(view.state.doc.toString(), "api");
        },
        setDiagnostics(diagnostics) {
          const normalized = normalizeDiagnostics(view.state.doc.toString(), diagnostics);
          hasDiagnostics = normalized.length > 0;
          diagnosticGeneration++;
          view.dispatch(cm.setDiagnostics(view.state, normalized));
        },
        focus: () => view.focus(),
        destroy() {
          destroyed = true;
          view.destroy();
        },
      };
    }

    /** Reject misspellings and invalid options rather than silently changing editor behaviour. */
    function validateOptions(options) {
      const languages = ["text", "java", "javascript", "typescript", "html", "css", "json", "python"];
      if (typeof options.value !== "string") throw new TypeError("value must be a string");
      if (!languages.includes(options.language)) throw new RangeError(`Unsupported language: ${options.language}`);
      if (!["light", "dark"].includes(options.theme)) throw new RangeError("theme must be light or dark");
      if (!Number.isInteger(options.tabSize) || options.tabSize < 1 || options.tabSize > 16)
        throw new RangeError("tabSize must be an integer from 1 to 16");
      for (const key of ["height", "fontSize", "label", "ariaLabel"])
        if (typeof options[key] !== "string") throw new TypeError(`${key} must be a string`);
      for (const key of ["indentWithTabs", "lineNumbers", "lineWrapping", "readOnly", "folding",
        "closeBrackets", "autocompletion", "autofocus"])
        if (typeof options[key] !== "boolean") throw new TypeError(`${key} must be a boolean`);
      if (options.onchange != null && typeof options.onchange !== "function")
        throw new TypeError("onchange must be a function");
    }

    /**
     * Converts compiler positions (one-based UTF-16 line/column, exclusive end) to
     * CodeMirror offsets. Out-of-document positions are clamped. CRLF counts as one break.
     * Messages remain text and are rendered by CodeMirror without HTML interpretation.
     */
    function normalizeDiagnostics(text, diagnostics) {
      if (!Array.isArray(diagnostics)) throw new TypeError("diagnostics must be an array");
      const lines = text.split(/\r\n?|\n/);
      const starts = [0];
      const breaks = text.matchAll(/\r\n?|\n/g);
      for (const match of breaks) starts.push(match.index + match[0].length);
      const position = (line, column) => {
        if (!Number.isInteger(line) || line < 1 || !Number.isInteger(column) || column < 1)
          throw new RangeError("Diagnostic line and column must be positive integers");
        const index = Math.min(line, lines.length) - 1;
        return starts[index] + Math.min(column - 1, lines[index].length);
      };
      return diagnostics.map((item) => {
        if (!item || typeof item.message !== "string") throw new TypeError("Diagnostic message must be a string");
        const severity = item.severity ?? "error";
        if (!["error", "warning", "info", "hint"].includes(severity))
          throw new RangeError(`Unsupported diagnostic severity: ${severity}`);
        const from = position(item.line, item.column ?? 1);
        const endLine = item.endLine ?? item.line;
        const endColumn = item.endColumn ?? lines[Math.min(endLine, lines.length) - 1]?.length + 1;
        const to = position(endLine, endColumn);
        if (to < from) throw new RangeError("Diagnostic end must not precede its start");
        return { from, to, severity, message: item.message };
      });
    }
  },
};

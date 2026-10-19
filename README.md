# ccmjs Code Editor

A reusable **CodeMirror 6** component for **ccmjs 28.0.0**. It edits plain-text
source code inside the component's Shadow DOM. It does not execute code, contact
a validation server or save documents. An enclosing exercise component can use
its public API to submit code and display compiler diagnostics.

## Run the demo

Serve this directory with any static web server and open `index.html` through
that server. All runtime dependencies are included in `libs/`; using the component
does **not** require Node.js, npm, a build step or an external CDN.
Opening `index.html` via `file://` does not work.

## Embed

The source component declares resource URLs as plain `././...` strings, matching
the other ccmjs components. During local development, `ccm.load` paths are relative
to the hosting page, so keep the page in this directory (as in the demo) or override
the resource URLs in the configuration. CodeMirror is imported inside the instance's
`init()` to preserve its class instances; its URL is relative to the component module.
The release build replaces `././` with the versioned CDN base URL for embedding
the released component elsewhere.

```html
<script src="./libs/framework/ccm-28.0.0.min.js"></script>
<div id="editor"></div>
<script type="module">
  const editor = await ccm.start('./ccm.code_editor.mjs', {
    language: 'java',
    label: 'Solution.java',
    ariaLabel: 'Java source code',
    value: 'public class Solution {\n}\n',
    onchange: ({ app, value, origin }) => console.log(origin, value)
  }, document.querySelector('#editor'));

  console.log(editor.getValue());
</script>
```

As a dependency of another ccmjs component:

```js
config: {
  editor: ['ccm.instance', '././libs/code_editor/ccm.code_editor.mjs', {
    language: 'java'
  }]
}

// In the parent's start(), after its view has been rendered:
this.element.querySelector('.editor-slot').append(this.editor.host);
this.editor.setValue(startCode, { notify: false });
await this.editor.start();
// Later: const solution = this.editor.getValue();
```

The parent embeds `editor.host`, which retains the editor's own Shadow Root.
Destroy the child before permanently removing the parent.

## Configuration

| Property | Default | Meaning |
| --- | --- | --- |
| `value` | `""` | Initial/current source text; must be a string |
| `language` | `"text"` | `text`, `java`, `javascript`, `typescript`, `html`, `css`, `json`, `python` |
| `label` | `""` | Optional visible label, rendered as text |
| `ariaLabel` | `"Code editor"` | Accessible name of the input |
| `theme` | `"light"` | `light` or `dark` |
| `height` | `"360px"` | CSS height, including `auto` |
| `fontSize` | `"14px"` | CSS font size |
| `tabSize` | `4` | Tab width and indentation width, integer 1–16 |
| `indentWithTabs` | `false` | Indent with a tab instead of spaces |
| `lineNumbers` | `true` | Show line numbers |
| `lineWrapping` | `false` | Wrap long lines |
| `readOnly` | `false` | Block user edits; selection, search and API updates still work |
| `folding` | `true` | Enable folding controls and shortcuts |
| `closeBrackets` | `true` | Complete opening brackets/quotes |
| `autocompletion` | `true` | Enable the selected language package's completion sources |
| `autofocus` | `false` | Focus after starting |
| `onchange` | — | Synchronous callback receiving `{ app, value, origin }` |
| `root` | `"open"` | ccmjs setting: `open`, `closed`, or `false` for light DOM |

`onchange` runs when the document changes, not when a selection moves or a
diagnostic is displayed. `origin` is `user` for typing/undo/redo and `api` for
`setValue`. Defer programmatic editor changes made from this callback until the
current editor update is complete. Asynchronous requests can read `value` and
update diagnostics after their response arrives.

Change display options on the instance, then call `start()` to apply them. This
recreates the view, preserving the current text and clearing history/diagnostics.
Use `setValue()` to replace the document of a running instance.

The Java language package provides highlighting, indentation and folding. It is
not a Java compiler or language server. In particular, `autocompletion: true`
does not provide Java type checking, automatic imports or IDE-style semantic
completion. Java 25 compilation belongs to the separate backend;
new syntax that the editor parser does not recognize can still be entered and
submitted. Parser errors are not shown as compiler diagnostics.

## Instance API

| Method | Behaviour |
| --- | --- |
| `start()` | Create/recreate the view using the current configuration |
| `getValue()` | Return the source as a string; editor line endings are normalized to LF |
| `setValue(code, { notify = true } = {})` | Replace text, clear undo/redo and diagnostics; optional `api` change notification |
| `setDiagnostics(items)` | Display external diagnostics; `[]` clears them; requires a started editor |
| `focus()` | Focus the editor, including read-only views |
| `destroy()` | Release the view/listeners, retaining the current value; safe to repeat |

`getValue()` and `setValue()` also work before the first `start()` and after
`destroy()`. Setting text never executes it or interprets it as HTML.

Diagnostics use **one-based line and column numbers**, with columns measured in
UTF-16 code units. The optional end position is exclusive. Without an end
position the rest of the line is marked. Out-of-document positions are clamped.

```js
editor.setDiagnostics([{
  line: 3,
  column: 5,
  endLine: 3,
  endColumn: 11,
  severity: 'error', // error (default), warning, info, hint
  message: 'Cannot find symbol: answer'
}]);
```

Messages are displayed as plain text. Editing clears diagnostics from the old
document. The enclosing app must also discard stale backend responses, for
example by comparing the submitted text or a revision counter with the current
document before calling `setDiagnostics()`.

## Keyboard and Shadow DOM

Standard undo/redo and search/replace shortcuts are enabled. Tab indents,
Shift+Tab unindents. **Escape, then Tab** leaves the editor, keeping it usable
without a mouse. Read-only content remains focusable and selectable.

The component supplies CodeMirror with the actual `Document` or `ShadowRoot`.
Themes, search panels, completion popups and diagnostic tooltips stay within the
editor. No global `window.CodeMirror`, global IDs or document-level selectors are
used by the component. Each instance owns its content, history and view.

## Repository layout

- `ccm.code_editor.mjs`: ccmjs configuration and `component.Instance`, containing the lifecycle,
  public API, CodeMirror setup, option validation and diagnostic-position mapping.
- `resources/views.mjs`, `resources/styles.css`: replaceable component shell.
- `resources/configs.mjs`: example configurations.
- `libs/`: bundled framework, ccm-ui and CodeMirror, including source maps/licenses.
- `index.html`: demo page with its controls, script and styles included inline.

## Releases

The CodeMirror bundle in `libs/codemirror/` is ready to use. Its package versions
and license notices are listed in `versions.json` and `LICENSES.txt`. Updating or
changing the bundle requires an external bundling step; this repository contains
no library build setup.

The manual **Build & Tag** workflow uses `ccmjs/component-release@v2.1.1`, matching
the other current ccmjs components. It packages the component, `resources/` and
the already bundled `libs/`. Version 2.0.0 in
the component header identifies this replacement of the CM5 API.

## Licenses

The component is MIT licensed. CodeMirror 6 and the bundled dependency packages
are MIT licensed; their copyright and license notices are retained in
`libs/codemirror/LICENSES.txt`. Framework and ccm-ui licenses are included in their
own directories. No cloud account or license key is required.

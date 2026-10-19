export const java = {
  label: "Main.java",
  ariaLabel: "Java-Quellcode",
  language: "java",
  height: "420px",
  tabSize: 4,
  value: `import java.util.List;

void main() {
    var namen = List.of("Ada", "Grace", "Linus");

    for (var name : namen) {
        IO.println("Hallo, " + name + "!");
    }
}
`,
};

export const demo = java;

export const javascript = {
  label: "hello.js",
  language: "javascript",
  height: "420px",
  value: `function greet(name) {
  return \`Hallo, \${name}!\`;
}

console.log(greet("Ada"));
`,
  tabSize: 2,
};

export const html = {
  label: "index.html",
  language: "html",
  height: "420px",
  value: `<main>
  <h1>Hallo Welt</h1>
  <p>Dieser HTML-Code wird nur bearbeitet und nicht ausgeführt.</p>
</main>
`,
  tabSize: 2,
};

export const python = {
  label: "hello.py",
  language: "python",
  height: "420px",
  tabSize: 4,
  value: `def greet(name):
    return f"Hallo, {name}!"


print(greet("Ada"))
`,
};

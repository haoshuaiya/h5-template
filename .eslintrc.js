module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "generator-star-spacing": "off",
        semi: "off",
        indent: [0, "tab"]
    },
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 6,
        sourceType: "module"
    }
};

## Installation

`npm i -D @alexmchan/babel-plugin-cssvarify`

Add to the babel plugins:

```
{
    plugins: ['@alexmchan/babel-plugin-cssvarify']
}
```

## Introduction

This is a simple example of a babel plugin that replaces a token `--blue-100` with `var(--blue-100)`

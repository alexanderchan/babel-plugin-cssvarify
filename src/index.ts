const replaceToken = '--'

const varReplaceRegex = new RegExp(
  `(?<!var\\(\\s*)\\${replaceToken}([a-zA-Z\\-_\\d]+)`,
  'gm'
)

function addVar(cssPropertyValue) {
  if (typeof cssPropertyValue !== 'string') {
    return cssPropertyValue
  }

  return cssPropertyValue.replace(varReplaceRegex, 'var(--$1)')
}

export function traverseVars({ t }) {
  return {
    StringLiteral(path) {
      if (path.parent?.key !== path.node) {
        path.node.value = addVar(path.node.value)
      }
    },
    TemplateElement(path) {
      if (path.parent?.key !== path.node) {
        path.node.value.raw = addVar(path.node.value.raw)
        path.node.value.cooked = addVar(path.node.value.cooked)
      }
    },
  }
}

export default function ({ types: t }) {
  return {
    name: '@alexmchan/cssvarify',
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      JSXAttribute(path) {
        if (['style'].includes(path.node.name.name)) {
          path.traverse(traverseVars({ t }))
        }
      },
    },
  }
}

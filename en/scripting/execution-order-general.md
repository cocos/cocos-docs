# Script execution order

The script loading sequence is as follows:

  1. The **Cocos Creator** engine module `"cc"` will be imported for the first time.

  1. **Plug-in scripts** - All plug-in scripts will be executed in the order of the specified plug-in script dependencies; plug-in scripts that do not have dependencies are disordered.

  1. **Common scripts** All common scripts will be imported concurrently. Import will strictly follow the reference relationship and execution order determined by `import`.

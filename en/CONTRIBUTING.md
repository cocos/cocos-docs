# English document writing standard

The purpose of the format specification is to provide uniform writing guidelines and make the finished document have a better reading experience.

## Use # for the title, separate the upper and lower text with a blank line

Use # for the first-level title.<br>
Use ## for the second-level title.<br>
Use ### for the third-level title.<br>
and so on...

Under normal circumstances, do not skip the use of headings, for example, the third-level headings cannot appear directly under the first-level heading.

Example (correct):

> \# Main Heading
>
> \## Sub-heading 1
>
> \### Sub-heading 2

Example (NOT correct):

> \# Main Heading
>
> \### Sub-heading 1

## Use correct initial capital letters for proper English nouns and component names

Correct usage:

> Log in with GitHub
>
> Sprite component

Incorrect usage:

> Login with github
>
> sprite component

## Use spaces

### A space needs to be added between the number and the unit

Correct usage:

> The bandwidth of my home is 1 Gbps, and the total hard disk is 10 TB.

Incorrect usage:

> The bandwidth of my home is 1Gbps, and the total hard disk is 10TB.

**Exception: There is no need to add a space between degree/percentage and number**

Correct usage:

> Today is a high temperature of 233°.
>
> The new MacBook Pro has a 15% increase in CPU performance.

Incorrect usage:

> Today is a high temperature of 233 °.
>
> The new MacBook Pro has a 15% increase in CPU performance.

### Add a jump link to a document in this repository

URL link format: **[url document name]\(url document path)**. Use halfwidth English punctuation.

> e.g: [Monitor and launch events]\(../scripting/events.md).

Correct usage:

> For details, please refer to the [Monitor and Launch Events](../scripting/events.md) documentation.

Incorrect usage:

> For details, please refer to the [Monitor and Launch Events] (../scripting/events.md) documentation.

### Add a URL to the API document

URL link format: **[url document name]\(url document directory)**. Use halfwidth English punctuation, and no spaces between [] and ()

> e.g: [Mask API]\(__APIDOC__/en/#/docs/3.3/zh/ui/Class/Mask). Use **.html** for file name suffixes across documents

## Use bold between adjacent text

**Panel names, components or other important interface elements in the editor** are expressed in bold.

> Format: open \*\*Inspector\*\* panel to view properties.

Correct usage:

> Open **Inspector** panel to view properties.
>
> Click the **Create** button to create a new node.
>
> Drag any picture resource to the **Sprite Frame** property.

Note that the property name in the editor should be written in the format displayed in the Inspector panel.

## Use backtick between the adjacent text

**Script attributes and method names are written according to the format displayed in the API**, expressed by backtick.

> Format: Set the scale of the node through \`this.node.scale\`

Correct usage:

> Set the scale of the node through `this.node.scale`.
>
> `this.getComponent(cc.Sprite).spriteFrame` can dynamically change the image rendered by the node.

**File name and file path**, use backtick to indicate.

Format: \`/mypath/myfile.ts\`

If it is a full path, you need to add / before it, if it is not a full path, you don’t need it.

Correct usage:

> The subpackage directory is under the `build/quickgame/dist` directory.

## Use blank lines

### The code paragraph and the context need to be separated by a blank line

E.g:

> Save Prefab, the code example is as follows:<br>
>
> \```js<br>
> Editor.Ipc.sendToPanel('scene','scene:apply-prefab', node.uuid);<br>
> \```
>
> Continue text part.

The effect is as follows:

> Save Prefab, the code example is as follows:
>
> ```js
> Editor.Ipc.sendToPanel('scene','scene:apply-prefab', node.uuid);
> ```
>
> Continue text part.

### The picture and the upper and lower text need to be separated by a blank line

Picture format: **![Picture description]\(relative path of the picture)**. Use halfwidth English punctuation, and no spaces between !, [], ().

> e.g: !\[background]\(quick-start/background.png)

If the picture is added to the text, it needs to add a space between the adjacent text

## Use blank lines or \<br\> for line breaks

If you use the Enter key to wrap, there will be no wrap effect on GitBook and a space will be added

**Use blank line wrap effect**:

> First line
>
> Second line

**Use \<br\> wrapping effect**:

> First line<br>
> Second line

**Use the enter key to wrap the line effect (not recommended)**:

> First line
> Second line

## Note writing format

> Format: **> \*\*Note\*\*: do not mix Chinese and English symbols in Chinese and English documents.**

When the note is more than two points, the writing format is as follows:

> \> \*\*Notes\*\*:<br>
> \> 1. The first point.<br>
> \> 2. The second point.<br>
> \> 3. One last point.<br>

The effect is as follows:

> **Notes**:
> 1. The first point.
> 2. The second point.
> 3. One last point.

## Introduction

### Used in the text-point introduction

When the main text is introduced with-points, the main text in the points, including pictures, need to be indented with 2/4 spaces. Generally, indents with two spaces are used. E.g:

> \- Point introduction 1
>
> (Two spaces) The body part that begins the first division.
>
> \- Introduction 2
>
> (Two spaces) The body part that begins the second division.
>
> (Two spaces) !\[image]\(image link)

The effect is as follows:

> - Point introduction 1
>
>   Start the text part of the first division.
>
> - Introduction 2
>
>   Start the text part of the second point.
>
>   !\[image]\(image link)

### Introduction to the use of digital points in the text

When the main text is introduced with **number** points, the main text in the points including pictures need to be indented with **4** spaces. E.g:

> 1\. Point introduction 1
>
> (4 spaces) The part of the body that begins the first division.
>
> 2\. Point introduction 2
>
> (4 spaces) The part of the body that begins the second division.
>
> (4 spaces) !\[image]\(image link)

The effect is as follows:

> 1. Sub-point introduction 1
>
>     Start the text part of the first division.
>
> 2. Sub-point introduction 2
>
>     Start the text part of the second point.
>
>     !\[image]\(image link)

## The table uniformly uses left alignment

E.g:

> | Property | Function Description |<br>
> | \:---- | :------ |<br>
> | Property 1 | Description 1 |<br>
> | Property 2 | Description 2 |

Appropriate spaces can be reserved before and after for easy editing.

## Grammar suggestions

- __Firstly__ ->  __First__.
- At present, —> Currently,
- Related Reference Links —> Reference documentation
- do not use phrases like: "Now let me explain", "he should do this"
- text like this should be avoided: "If you have never written a program and don’t worry, we will provide all the required code in the tutorial, just copy and paste it to the correct location, and then you can find your programmer partner to solve this part of the work. Let's start creating the script that drives the main character's actions."
- text like this should be avoided: "So, "

## About product name

1. Cocos Creator
2. Cocos Creator 2.4.3
3. v2.4.3
4. v3.0
5. The engine (where refer to the runtime)
6. The editor (where refer to the IDE)

**Versions**:

- 2.4.3 (3.0.0)
- 2.4.3 Preview (GA/RC/Alpha/Beta ...)
- 2.4.x (3.0.x)
- 2.4 (3.0)
- 2.x (3.x)

**Never use**:

1. CCC or ccc
2. Cocos (where refer to Cocos Creator)
3. IDE (where refer to Cocos Creator)

## Technical designations

- json -> JSON
- js or JS -> JavaScript
- ts or TS -> TypeScript

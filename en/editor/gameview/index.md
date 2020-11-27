## GameView description

![image](./gameview.png)

**GameView** is a game view function embedded in the editor. It can run the game in the editor without opening the browser. The advantage is that it can adjust the model and state of the game in real time through gizmo or other plugins of the editor, etc, achieving what you see, is what you get when the game is running.

## GameView open method

![image](./gameviewOpen.png)

To open the GameView panel, click the GameView in the drop-down box of the run mode, on the top toolbar in the editor.

## Button operation instructions

![image](./gameviewButton.png)

After opening the **GameView** window, you can find there are three extra buttons on the top toolbar, **play/stop**, **pause**, and **step**:

- **play/stop**: Click this button to run the game in the editor, and during this state of the button you can switch to the stop state, just click the `stop` button to stop the game.

- **pause**: Click this button to pause the running game.

- **step**: Click this button to run the game step by step, which is convenient for debugging.

## GameView synchronization

The **GameView** before running can exist as a preview function. When adjusting the gizmo or adjusting the scene through other plugins, the **GameView** screen can be synchronized in real time.

## GameView runtime

![image](./gameviewUI.png)

When running the game, **GameView** can run the life cycle of each node component in real time, which includes mouse and keyboard events and UI event response.

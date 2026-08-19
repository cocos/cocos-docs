# 集成 Input SDK

Input SDK提供了一个统一的界面，让玩家在 Google Play Games For PC 上方便地找到游戏的鼠标和键盘绑定，从而提升玩家的游戏体验。

## 准备工作

如果你要在一个全新的 Android 构建上使用 Input SDK，只需要在构建面板上勾选 Input SDK 选项。

如果这个 Anrdoid 工程是之前构建的，就需要手动在 文件 `native/engine/android/app/build.gradle` 中添加下面的代码：

```txt
dependencies {
  implementation 'com.google.android.libraries.play.games:inputmapping:1.0.0-beta'
  ...
}
```

## 添加 InputMapProvider 实现

新建类文件 `MyInputMapProvider.java`。

```java
    public class MyInputMapProvider implements InputMappingProvider {
        public enum InputEventIds {
            JUMP,
            LEFT,
            RIGHT,
            USE,
            SPECIAL_JUMP,
            SPECIAL_DUCK,
            CMB_MOVE,
            CMB_DASH,
            CMB_WAYPOINT
        }

        @Override
        public InputMap onProvideInputMap() {
            InputAction jumpInputAction = InputAction.create(
                    getString(R.string.key_jump),
                    InputEventIds.JUMP.ordinal(),
                    InputControls.create(
                            Collections.singletonList(KeyEvent.KEYCODE_SPACE),
                            Collections.emptyList()
                    )
            );
            InputAction leftAction = InputAction.create(
                    getString(R.string.key_Left),
                    InputEventIds.LEFT.ordinal(),
                    InputControls.create(
                            Collections.singletonList(KeyEvent.KEYCODE_DPAD_LEFT),
                            Collections.emptyList()
                    )
            );
            InputAction rightAction = InputAction.create(
                    getString(R.string.key_Right),
                    InputEventIds.RIGHT.ordinal(),
                    InputControls.create(
                            Collections.singletonList(KeyEvent.KEYCODE_DPAD_RIGHT),
                            Collections.emptyList()
                    )
            );

            InputAction cmbMove = InputAction.create(
                    getString(R.string.key_Move),
                    InputEventIds.CMB_MOVE.ordinal(),
                    InputControls.create(
                            Collections.emptyList(),
                            Collections.singletonList(InputControls.MOUSE_RIGHT_CLICK)
                    )
            );
            InputAction cmbDash = InputAction.create(
                    getString(R.string.key_Dash),
                    InputEventIds.CMB_DASH.ordinal(),
                    InputControls.create(
                            Arrays.asList(KeyEvent.KEYCODE_SHIFT_LEFT, KeyEvent.KEYCODE_SPACE),
                            Collections.emptyList()
                    )
            );
            InputAction cmbWaypoint = InputAction.create(
                    getString(R.string.key_Waypoint),
                    InputEventIds.CMB_WAYPOINT.ordinal(),
                    InputControls.create(
                            Collections.singletonList(KeyEvent.KEYCODE_SHIFT_LEFT),
                            Collections.singletonList(InputControls.MOUSE_RIGHT_CLICK)
                    )
            );
            InputGroup movementInputGroup = InputGroup.create(
                    getString(R.string.key_BasicMove),
                    Arrays.asList(jumpInputAction, leftAction, rightAction, cmbMove, cmbDash, cmbWaypoint)
            );
            return InputMap.create(
                    Arrays.asList(movementInputGroup),
                    MouseSettings.create(true, true)
            );
        }
    }

```

## 添加按键的描述

在 `res\values\strings.xml` 中定义用于国际化的文本，以供前面步骤中使用。

```xml
<resources>
    ...
    <string name="key_jump">Jump</string>
    <string name="key_Left">Left</string>
    <string name="key_Right">Right</string>
    <string name="key_Move">Move</string>
    <string name="key_Dash">Dash</string>
    <string name="key_Waypoint">Add Waypoint</string>
    <string name="key_BasicMove">Basic Movement</string>
</resources>
```

## 修改 `AppActivity` 注册 `InputMapping`

`AppActivity.java` 位于 `native\engine\android\app\src\main\cocos\game`，需做如下修改。

```java
    ...
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ...
        
        InputMappingClient inputMappingClient = Input.getInputMappingClient(this);
        inputMappingClient.setInputMappingProvider(new MyInputMapProvider());
    }
    ...

    @Override
    protected void onDestroy() {
        InputMappingClient inputMappingClient = Input.getInputMappingClient(this);
        inputMappingClient.clearInputMappingProvider();

        super.onDestroy();
        ...
    }
   
```

## 测试效果

在 Google Play Games 提供的 HPE 模拟器中运行，通过 Shift + Tab 调出页面。

![key codes](./publish-native/gpg-input-sdk-keys.png)

更多的细节请参考 [Input SDK 官方文档](https://developer.android.com/games/playgames/input-sdk-start)。

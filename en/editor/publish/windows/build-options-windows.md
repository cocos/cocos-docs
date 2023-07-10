# Build Options - Windows

The build options for the Windows platform include the **Render BackEnd** and **Target Platform**.

![build-options-windows](./images/build-options-windows.png)

## Executable Name

This a field used to specify the name of the main executable file of an application. If not provided, the system will generate a default value based on the app name field. The value for this field must adhere to a specific format, containing only numbers, letters, underscores (_) and hyphens (-).

## Render BackEnd

On the Windows platform, Cocos Creator currently supports three render backends: **VULKAN**, **GLES3**, and **GLES2**. By default, **GLES3** is selected. If multiple options are selected, the runtime will choose the appropriate render backend based on the device's capabilities.

## Target Platform

Set the compilation architecture, currently only supporting **x64**, which means the application can only run on **x64** systems.

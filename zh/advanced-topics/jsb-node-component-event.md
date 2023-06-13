# 组件管理与事件管理

尽管 Node 的大部分逻辑已经在 CPP 层中实现了，但是`组件(Component)及其子类`和`事件(NodeEventProcessor)`都还是在 TS 中实现，这主要是基于性能与维护成本考虑。我们碰到的问题是，如何让一个 CPP 实现的类型能够有一部分功能是在 JS 中附加实现？我们通过在 node.jsb.ts 中对 Node.prototype 进行动态添加`组件管理`与`事件`相关的的代码来实现这种 hybrid 的机制。

node.jsb.ts

```ts
nodeProto.getComponent = function (typeOrClassName) {
    const constructor = getConstructor(typeOrClassName);
    if (constructor) {
        return NodeCls._findComponent(this, constructor);
    }
    return null;
};

nodeProto.getComponents = function (typeOrClassName) {
    const constructor = getConstructor(typeOrClassName);
    const components = [];
    if (constructor) {
        NodeCls._findComponents(this, constructor, components);
    }
    return components;
};

nodeProto.getComponentInChildren = function (typeOrClassName) {
    const constructor = getConstructor(typeOrClassName);
    if (constructor) {
        return NodeCls._findChildComponent(this._children, constructor);
    }
    return null;
};

nodeProto.getComponentsInChildren = function (typeOrClassName) {
    const constructor = getConstructor(typeOrClassName);
    const components = [];
    if (constructor) {
        NodeCls._findComponents(this, constructor, components);
        NodeCls._findChildComponents(this.children, constructor, components);
    }
    return components;
};

nodeProto.addComponent = function (typeOrClassName) {
    ......
};

nodeProto.removeComponent = function (component) {
    if (!component) {
        errorID(3813);
        return;
    }
    let componentInstance: any = null;
    if (component instanceof Component) {
        componentInstance = component;
    } else {
        componentInstance = this.getComponent(component);
    }
    if (componentInstance) {
        componentInstance.destroy();
    }
};

nodeProto.on = function (type, callback, target, useCapture: any = false) {
    switch (type) {
        case NodeEventType.TRANSFORM_CHANGED:
            this._eventMask |= TRANSFORM_ON;
            if (!(this._registeredNodeEventTypeMask & REGISTERED_EVENT_MASK_TRANSFORM_CHANGED)) {
                this._registerOnTransformChanged();
                this._registeredNodeEventTypeMask |= REGISTERED_EVENT_MASK_TRANSFORM_CHANGED;
            }
            break;
        ......
        default:
            break;
    }
    this._eventProcessor.on(type, callback, target, useCapture);
};

nodeProto.off = function (type: string, callback?, target?, useCapture = false) {
    this._eventProcessor.off(type, callback, target, useCapture);

    const hasListeners = this._eventProcessor.hasEventListener(type);
    // All listener removed
    if (!hasListeners) {
        switch (type) {
            case NodeEventType.TRANSFORM_CHANGED:
                this._eventMask &= ~TRANSFORM_ON;
                break;
            default:
                break;
        }
    }
};

nodeProto.once = function (type: string, callback, target?: unknown, useCapture?: any) {
    this._eventProcessor.once(type, callback, target, useCapture);
};

nodeProto.emit = function (type: string, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) {
    this._eventProcessor.emit(type, arg0, arg1, arg2, arg3, arg4);
};

nodeProto.dispatchEvent = function (event: Event) {
    this._eventProcessor.dispatchEvent(event);
};

nodeProto.hasEventListener = function (type: string, callback?, target?: unknown) {
    return this._eventProcessor.hasEventListener(type, callback, target);
};

nodeProto.targetOff = function (target: string | unknown) {
    this._eventProcessor.targetOff(target);
    // Check for event mask reset
    if ((this._eventMask & TRANSFORM_ON) && !this._eventProcessor.hasEventListener(NodeEventType.TRANSFORM_CHANGED)) {
        this._eventMask &= ~TRANSFORM_ON;
    }
};

nodeProto.pauseSystemEvents = function pauseSystemEvents (recursive: boolean): void {
    this._eventProcessor.setEnabled(false, recursive);
};

nodeProto.resumeSystemEvents = function resumeSystemEvents (recursive: boolean): void {
    this._eventProcessor.setEnabled(true, recursive);
};

nodeProto._removeComponent = function (component: Component) {
    if (!component) {
        errorID(3814);
        return;
    }

    if (!(this._objFlags & Destroying)) {
        const i = this._components.indexOf(component);
        if (i !== -1) {
            this._components.splice(i, 1);
            if (EDITOR && EditorExtends.Component) {
                EditorExtends.Component.remove(component._id);
            }
            this.emit(NodeEventType.COMPONENT_REMOVED, component);
        } else if (component.node !== this) {
            errorID(3815);
        }
    }
};
```


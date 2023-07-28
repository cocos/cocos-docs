import { _decorator, animation, ccenum, Component, Node } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

enum BaseLayerPose {
    Standing,
    Crouch,
    Leaning_Original,
}
ccenum(BaseLayerPose);

@ccclass('AdditivePoseDemonstration')
@requireComponent(animation.AnimationController)
export class AdditivePoseDemonstration extends Component {
    @property({ type: BaseLayerPose })
    baseLayerPose = BaseLayerPose.Standing;

    @property({ range: [0.0, 1.0, 0.01], slide: true })
    additiveLayerWeight = 0.0;

    update(deltaTime: number) {
        const controller = this.node.getComponent(animation.AnimationController);
        controller.setValue('BaseLayerPose', this.baseLayerPose);
        controller.setLayerWeight(1, this.additiveLayerWeight);
    }
}



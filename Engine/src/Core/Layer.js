export default class Layer {
    Layer(_debugName) {
        this.debugName = _debugName;
    }
    onAttach() {
        throw new Error("You have to implement the method onAttach for layer: " + this.debugName);
    }
    onDetach() {
        throw new Error("You have to implement the method onDetach for layer: " + this.debugName);
    }
    onUpdate() {
        throw new Error("You have to implement the method onUpdate for layer: " + this.debugName);
    }
}
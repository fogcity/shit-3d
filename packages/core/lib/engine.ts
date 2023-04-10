import { initDepthStencil, initGPU } from './core';
import { createScene, Scene } from './scene';

type EngineOptions = Partial<{
  antialias: boolean;
  preserveDrawingBuffer: boolean;
  stencil: boolean;
}>;

export class Engine {
  scene: Scene;
  device: GPUDevice;
  context: GPUCanvasContext;
  format: GPUTextureFormat;

  queue: GPUQueue;

  primitive: GPUPrimitiveState;
  depthStencil: GPUDepthStencilState;
  renderDepthTexture: GPUTexture;
  shadowDepthTexture: GPUTexture;
  shadowDepthView: GPUTextureView;
  renderDepthView: GPUTextureView;

  constructor(public canvas: HTMLCanvasElement, options?: EngineOptions) {}

  createDefaultScene() {
    const scene = createScene(this);
    this.addScene(scene);
    return scene;
  }

  addScene(scene: Scene) {
    this.scene = scene;
  }

  async init() {
    this.primitive = {
      topology: 'triangle-list',
      cullMode: 'back',
    };
    this.depthStencil = {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth32float',
    };
    const { device, context, format } = await initGPU(this.canvas);

    // const { depthFormat, depthTexture } = await initDepthStencil(
    //   device,
    //   this.canvas
    // );

    this.device = device;
    this.queue = device.queue;
    this.context = context;
    this.format = format;
    const size = { width: this.canvas.width, height: this.canvas.height };

    this.shadowDepthTexture = device.createTexture({
      size: [2048, 2048],
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
      format: 'depth32float',
    });
    this.renderDepthTexture = device.createTexture({
      size,
      format: 'depth32float',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    // create depthTextureView
    this.shadowDepthView = this.shadowDepthTexture.createView();
    this.renderDepthView = this.renderDepthTexture.createView();
  }

  async loop(frameRenderFunction: () => void, frames?: number) {
    await this.init();
    console.log('engine init complete.');

    await this.scene.init();
    console.log('scene init complete.');
    requestAnimationFrame(function renderFrame() {
      console.log('start frame render');

      frameRenderFunction();
      console.log('end frame render');
      requestAnimationFrame(renderFrame);
    });
  }
}

export function createEngine(canvas: HTMLCanvasElement, options?: EngineOptions) {
  return new Engine(canvas, options);
}

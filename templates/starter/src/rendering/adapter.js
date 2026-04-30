// src/rendering/adapter.js
//
// Common interface all rendering engines implement. After /setup-engine,
// a real adapter lives in src/rendering/<engine>/adapter.js.

/**
 * @typedef {Object} RenderAdapter
 * @property {(state: any, alpha: number) => void} render
 * @property {() => void} dispose
 */

/**
 * Create an adapter. Implementations plug in per engine.
 * @param {HTMLCanvasElement} canvas
 * @param {{ engine: 'phaser' | 'pixijs' | 'threejs' | 'babylonjs' | 'canvas' }} opts
 * @returns {RenderAdapter}
 */
export function createRenderer(canvas, opts) {
  throw new Error(
    `No renderer adapter wired for "${opts?.engine}". ` +
    `Run /setup-engine ${opts?.engine || '<n>'} to install one.`
  );
}

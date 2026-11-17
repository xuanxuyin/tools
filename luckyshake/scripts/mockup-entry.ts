/**
 * 效果图原型入口（仅 research/fortune-scene-mockups/proto 使用，不进站点构建）：
 * 引真 jar3d，按 ?state= 自动演出抽签仪式供无头 Chrome 定时截图。
 *   （无参数）静置签筒 | draw=摇签→掉签→结果面板
 */
import { createJar3D } from '../src/lib/jar3d';

const params = new URLSearchParams(location.search);
const host = document.querySelector<HTMLElement>('[data-jar3d]');
const jar = host ? createJar3D(host) : null;
(window as unknown as { __jar: unknown }).__jar = jar;

if (params.get('state') === 'draw' && jar) {
  setTimeout(() => jar.startShake(), 500);
  // 0.9s 摇动后掉签；标签牌写真实签文（黄大仙第 1 签 上上）
  setTimeout(() => jar.popStick('1', '黄大仙灵签 · 上上'), 1600);
  // 签落地（FLIGHT 0.62s + 弹跳）后亮出结果面板
  setTimeout(() => document.body.classList.add('slip-on'), 2900);
}

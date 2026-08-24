/* ═══════════════ Cover Gallery — 封面设计库交互（复刻应用内 CoverGallery + CoverFlipPreview） ═══════════════
 * 数据移植自 MemBook src/types/cover-templates.ts（8 款 Mixbook 招牌封面 + 配套封底）。
 * 渲染逻辑对齐 src/components/common/CoverPreview.tsx：背景 / 照片槽位 / 蒙版 / 文字 / 形状，
 * 字号与描边用 cqw（容器宽度百分比）等比缩放，与封面尺寸保持固定比例。
 */
(function () {
  'use strict';

  /* ── 通用渐变（与 cover-templates.ts 一致） ── */
  var GOLD = [{ offset: 0, color: '#E9CD85' }, { offset: 0.55, color: '#C99B3F' }, { offset: 1, color: '#8C6A1E' }];
  var ROSEGOLD = [{ offset: 0, color: '#F2D0C0' }, { offset: 0.6, color: '#D9A08A' }, { offset: 1, color: '#B07A63' }];
  var INKDARK = [{ offset: 0, color: '#3A4657' }, { offset: 1, color: '#1B2430' }];
  var CORAL = [{ offset: 0, color: '#FF8A6B' }, { offset: 1, color: '#E13A6E' }];
  var RAINBOW_1 = [{ offset: 0, color: '#E13A6E' }, { offset: 0.5, color: '#5B7CFA' }, { offset: 1, color: '#3EBF8A' }];
  var BLUEVIOLET = [{ offset: 0, color: '#5B7CFA' }, { offset: 1, color: '#8A5BF0' }];
  var FOREST = [{ offset: 0, color: '#3EBF8A' }, { offset: 1, color: '#1F7A5C' }];
  var WHITE_SUN = [{ offset: 0, color: '#FFFFFF' }, { offset: 1, color: '#FFF3C4' }];

  var SANS = "'Helvetica Neue', Arial, sans-serif";
  var SERIF = 'Georgia, serif';

  /* ── 预览照片（对齐应用内 CoverPreview 使用 cover-landscape 真实照片） ── */
  var PHOTO_POOL = [
    'images/landscape-peaks.png',
    'images/landscape-tropic.png',
    'images/landscape-lake.png',
    'images/family-park-pure.png',
    'images/baby-walking.png',
    'images/kids-reading.png',
    'images/travel-castle.png',
    'images/travel-desert.png',
  ];
  var photoFor = function (i) { return PHOTO_POOL[i % PHOTO_POOL.length]; };

  /* ── 封面模板数据（8 款招牌封面 + 配套封底） ── */
  var COVERS = [
    {
      id: 'cover-1', name: 'Minimal White', nameZh: '极简白',
      bg: '#FFFFFF', spine: '#FFFFFF',
      slots: [{ x: 14, y: 10, w: 72, h: 56, r: 4 }],
      texts: [
        { x: 12, y: 70, w: 76, h: 8, text: 'A YEAR IN FOCUS', fs: 15, ff: SERIF, color: '#3A3A4A', align: 'center', ls: 3, grad: INKDARK, ga: 90 },
        { x: 12, y: 84, w: 76, h: 6, text: '2024', fs: 12, ff: SERIF, color: '#9AA0A6', align: 'center', ls: 4 },
      ],
      shapes: [
        { x: 40, y: 68, w: 20, h: 0.4, type: 'line', fill: '#C99B3F', opacity: 0.5, grad: GOLD },
      ],
      back: {
        bg: '#FFFFFF',
        texts: [
          { x: 12, y: 52, w: 76, h: 8, text: 'With Love & Gratitude', fs: 15, ff: SERIF, color: '#3A3A4A', align: 'center', italic: true, ls: 1, grad: INKDARK, ga: 90 },
          { x: 12, y: 66, w: 76, h: 6, text: '2024', fs: 12, ff: SERIF, color: '#9AA0A6', align: 'center', ls: 4 },
        ],
        shapes: [
          { x: 42, y: 62, w: 16, h: 0.4, type: 'line', fill: '#C99B3F', opacity: 0.5, grad: GOLD },
        ],
        slots: [],
      },
    },
    {
      id: 'cover-2', name: 'Full Photo Travel', nameZh: '全幅旅行',
      bg: '#EDF2F7', spine: '#D7DEE6',
      slots: [{ x: 0, y: 0, w: 100, h: 100, r: 0 }],
      texts: [
        { x: 6, y: 58, w: 84, h: 14, text: 'EXPLORE', fs: 34, ff: SANS, color: '#FFFFFF', align: 'left', bold: true, ls: 6 },
        { x: 6, y: 72, w: 78, h: 7, text: 'The World Around You', fs: 13, ff: SANS, color: '#FFFFFF', align: 'left', grad: [{ offset: 0, color: '#FFE9A8' }, { offset: 1, color: '#FFB74D', alpha: 0.9 }], ls: 1 },
        { x: 6, y: 82, w: 78, h: 6, text: '2024', fs: 11, ff: SERIF, color: 'rgba(255,255,255,0.75)', align: 'left', ls: 3 },
      ],
      shapes: [
        { x: 0, y: 46, w: 100, h: 54, type: 'rect', fill: 'transparent', grad: [{ offset: 0, color: '#000000', alpha: 0.05 }, { offset: 1, color: '#000000', alpha: 0.55 }], ga: 270 },
      ],
      back: {
        bg: '#EDF2F7',
        slots: [{ x: 0, y: 0, w: 100, h: 100, r: 0 }],
        texts: [
          { x: 6, y: 76, w: 84, h: 10, text: 'KEEP EXPLORING', fs: 20, ff: SANS, color: '#FFFFFF', align: 'left', bold: true, grad: [{ offset: 0, color: '#FFE9A8' }, { offset: 1, color: '#FFB74D' }], ls: 4 },
          { x: 6, y: 84, w: 78, h: 6, text: '2024', fs: 11, ff: SERIF, color: 'rgba(255,255,255,0.8)', align: 'left', ls: 3 },
        ],
        shapes: [
          { x: 0, y: 60, w: 100, h: 40, type: 'rect', fill: 'transparent', grad: [{ offset: 0, color: '#000000', alpha: 0.05 }, { offset: 1, color: '#000000', alpha: 0.5 }], ga: 270 },
        ],
      },
    },
    {
      id: 'cover-3', name: 'Everyday Family', nameZh: '日常家庭',
      bg: '#F5F5F2', spine: '#E5E3DC',
      slots: [{ x: 0, y: 0, w: 100, h: 100, r: 0 }],
      texts: [
        { x: 14, y: 70, w: 76, h: 10, text: 'THE EVERYDAY', fs: 24, ff: SERIF, color: '#FFFFFF', align: 'center', ls: 4 },
        { x: 14, y: 82, w: 76, h: 6, text: 'A Family Journal', fs: 12, ff: SERIF, color: 'rgba(255,255,255,0.9)', align: 'center', italic: true, grad: ROSEGOLD, ls: 1 },
        { x: 14, y: 86, w: 76, h: 5, text: '2024', fs: 10, ff: SERIF, color: 'rgba(255,255,255,0.8)', align: 'center', ls: 3 },
      ],
      shapes: [
        { x: 0, y: 58, w: 100, h: 42, type: 'rect', fill: 'transparent', grad: [{ offset: 0, color: '#000000', alpha: 0 }, { offset: 1, color: '#000000', alpha: 0.5 }], ga: 90 },
      ],
      back: {
        bg: '#F5F5F2',
        slots: [{ x: 0, y: 0, w: 100, h: 100, r: 0 }],
        texts: [
          { x: 14, y: 72, w: 72, h: 10, text: 'Made with Love', fs: 20, ff: SERIF, color: '#FFFFFF', align: 'center', italic: true, grad: ROSEGOLD, ls: 2 },
          { x: 14, y: 84, w: 72, h: 6, text: '2024', fs: 11, ff: SERIF, color: 'rgba(255,255,255,0.85)', align: 'center', ls: 3 },
        ],
        shapes: [
          { x: 0, y: 58, w: 100, h: 42, type: 'rect', fill: 'transparent', grad: [{ offset: 0, color: '#000000', alpha: 0 }, { offset: 1, color: '#000000', alpha: 0.5 }], ga: 90 },
        ],
      },
    },
    {
      id: 'cover-4', name: 'Multi Photo', nameZh: '多图拼排',
      bg: '#F7F7F5', spine: '#E9E6DF',
      slots: [{ x: 12, y: 10, w: 37, h: 58, r: 4 }, { x: 51, y: 10, w: 37, h: 58, r: 4 }],
      texts: [
        { x: 12, y: 74, w: 76, h: 10, text: 'OUR ADVENTURES', fs: 20, ff: SERIF, color: '#3A3230', align: 'center', ls: 3, grad: INKDARK, ga: 90 },
        { x: 12, y: 84, w: 76, h: 6, text: 'Two Sides of the Story', fs: 11, ff: SERIF, color: '#9A948C', align: 'center', italic: true, ls: 1 },
        { x: 12, y: 88, w: 76, h: 5, text: '2024', fs: 10, ff: SERIF, color: '#9A948C', align: 'center', ls: 3 },
      ],
      shapes: [],
      back: {
        bg: '#F7F7F5',
        slots: [{ x: 12, y: 12, w: 37, h: 50, r: 4 }, { x: 51, y: 12, w: 37, h: 50, r: 4 }],
        texts: [
          { x: 12, y: 66, w: 76, h: 8, text: 'Our Story', fs: 18, ff: SERIF, color: '#3A3230', align: 'center', ls: 3, grad: INKDARK, ga: 90 },
          { x: 12, y: 80, w: 76, h: 6, text: '2024', fs: 11, ff: SERIF, color: '#9A948C', align: 'center', italic: true, ls: 3 },
        ],
        shapes: [
          { x: 40, y: 92, w: 20, h: 0.4, type: 'line', fill: '#C99B3F', opacity: 0.5, grad: GOLD },
        ],
      },
    },
    {
      id: 'cover-5', name: "Couple's Story", nameZh: '恋恋故事',
      bg: '#F7F4EE', spine: '#EFE8DC',
      slots: [{ x: 52, y: 0, w: 48, h: 100, r: 0 }],
      texts: [
        { x: 12, y: 20, w: 34, h: 16, text: 'THE STORY\nOF US', fs: 22, ff: SERIF, color: '#3A3632', align: 'left', grad: GOLD, ga: 90, ls: 2, lh: 1.6 },
        { x: 12, y: 46, w: 34, h: 7, text: 'A Love Story in Frames', fs: 11, ff: SERIF, color: '#B9A27E', align: 'left', italic: true, ls: 1 },
        { x: 12, y: 60, w: 34, h: 6, text: '2024', fs: 11, ff: SERIF, color: '#9A9AA8', align: 'left', ls: 3 },
      ],
      shapes: [
        { x: 14, y: 40, w: 20, h: 0.4, type: 'line', fill: '#C99B3F', opacity: 0.6, grad: GOLD },
      ],
      back: {
        bg: '#F7F4EE',
        slots: [],
        texts: [
          { x: 14, y: 50, w: 72, h: 10, text: 'Forever & Always', fs: 18, ff: SERIF, color: '#3A3632', align: 'center', italic: true, grad: GOLD, ga: 90, ls: 1 },
          { x: 14, y: 66, w: 72, h: 6, text: '2024', fs: 12, ff: SERIF, color: '#9A9AA8', align: 'center', ls: 4 },
        ],
        shapes: [
          { x: 38, y: 62, w: 24, h: 0.4, type: 'line', fill: '#C99B3F', opacity: 0.6, grad: GOLD },
        ],
      },
    },
    {
      id: 'cover-6', name: 'Classic Blue', nameZh: '经典蓝调',
      bg: '#EAF1F8', spine: '#D3E0EC',
      slots: [{ x: 0, y: 0, w: 100, h: 100, r: 0 }],
      texts: [
        { x: 8, y: 56, w: 84, h: 16, text: 'EVERYDAY\nMOMENTS', fs: 26, ff: SERIF, color: '#FFFFFF', align: 'left', bold: true, ls: 2, lh: 1.2 },
        { x: 8, y: 82, w: 80, h: 6, text: 'A Photographic Record', fs: 13, ff: SERIF, color: 'rgba(255,255,255,0.9)', align: 'left', italic: true, ls: 1 },
        { x: 8, y: 88, w: 80, h: 5, text: '2024', fs: 11, ff: SERIF, color: 'rgba(255,255,255,0.75)', align: 'left', ls: 3 },
      ],
      shapes: [
        { x: 0, y: 42, w: 100, h: 58, type: 'rect', fill: 'transparent', grad: [{ offset: 0, color: '#0E2240', alpha: 0 }, { offset: 0.5, color: '#0E2240', alpha: 0.5 }, { offset: 1, color: '#0E2240', alpha: 0.85 }], ga: 90 },
      ],
      back: {
        bg: '#0E2240',
        slots: [],
        texts: [
          { x: 14, y: 50, w: 72, h: 10, text: 'Cherished Moments', fs: 20, ff: SERIF, color: '#B08A3E', align: 'center', italic: true, grad: GOLD, ga: 90, ls: 2 },
          { x: 14, y: 66, w: 72, h: 6, text: '2024', fs: 12, ff: SERIF, color: '#C9D6E8', align: 'center', ls: 4 },
        ],
        shapes: [
          { x: 40, y: 62, w: 20, h: 0.4, type: 'line', fill: '#C99B3F', opacity: 0.6, grad: GOLD },
        ],
      },
    },
    {
      id: 'cover-7', name: 'Summer Bright', nameZh: '明亮盛夏',
      bg: '#FFDF5C', spine: '#E8B93E',
      slots: [{ x: 24, y: 12, w: 52, h: 44, r: 4 }],
      texts: [
        { x: 10, y: 60, w: 80, h: 14, text: 'SUMMER', fs: 30, ff: SANS, color: '#E13A6E', align: 'center', bold: true, grad: CORAL, ga: 90, ls: 8 },
        { x: 10, y: 76, w: 80, h: 8, text: '2026', fs: 16, ff: SANS, color: '#E13A6E', align: 'center', bold: true, ls: 6 },
        { x: 10, y: 84, w: 80, h: 5, text: 'Sun Soaked Days', fs: 10, ff: SERIF, color: '#B06A2E', align: 'center', italic: true, ls: 2 },
      ],
      shapes: [
        { x: 44, y: 4, w: 12, h: 12, type: 'circle', fill: '#FFFFFF', opacity: 0.9, grad: WHITE_SUN, ga: 135 },
      ],
      back: {
        bg: '#FFDF5C',
        slots: [],
        texts: [
          { x: 10, y: 60, w: 80, h: 12, text: 'Good Times', fs: 24, ff: SANS, color: '#E13A6E', align: 'center', bold: true, grad: CORAL, ga: 90, ls: 6 },
          { x: 10, y: 78, w: 80, h: 8, text: '2026', fs: 16, ff: SANS, color: '#E13A6E', align: 'center', bold: true, ls: 6 },
        ],
        shapes: [
          { x: 44, y: 4, w: 12, h: 12, type: 'circle', fill: '#FFFFFF', opacity: 0.9, grad: WHITE_SUN, ga: 135 },
        ],
      },
    },
    {
      id: 'cover-8', name: 'Year in Review', nameZh: '年度回顾',
      bg: '#FFFFFF', spine: '#E8E8E8',
      slots: [{ x: 18, y: 20, w: 64, h: 44, r: 4 }],
      texts: [
        { x: 10, y: 68, w: 80, h: 16, text: 'YEAR IN\nREVIEW', fs: 26, ff: SANS, color: '#2A2A3A', align: 'center', bold: true, grad: BLUEVIOLET, ga: 90, ls: 4, lh: 1.5 },
        { x: 10, y: 84, w: 80, h: 6, text: 'The Highlights of 2024', fs: 11, ff: SERIF, color: '#9AA0A6', align: 'center', italic: true, ls: 1 },
        { x: 10, y: 88, w: 80, h: 5, text: '2024', fs: 10, ff: SERIF, color: '#9AA0A6', align: 'center', ls: 3 },
      ],
      shapes: [
        { x: 12, y: 6, w: 76, h: 1.5, type: 'rect', fill: 'transparent', opacity: 0.9, grad: RAINBOW_1 },
        { x: 12, y: 9, w: 76, h: 1.5, type: 'rect', fill: '#5B7CFA', opacity: 0.9, grad: FOREST },
        { x: 12, y: 12, w: 76, h: 1.5, type: 'rect', fill: '#3EBF8A', opacity: 0.9, grad: BLUEVIOLET },
      ],
      back: {
        bg: '#FFFFFF',
        slots: [],
        texts: [
          { x: 10, y: 52, w: 80, h: 10, text: 'The Year in Moments', fs: 18, ff: SANS, color: '#2A2A3A', align: 'center', bold: true, grad: BLUEVIOLET, ga: 90, ls: 3 },
          { x: 10, y: 68, w: 80, h: 6, text: '2024', fs: 12, ff: SERIF, color: '#9AA0A6', align: 'center', italic: true, ls: 4 },
        ],
        shapes: [
          { x: 12, y: 6, w: 76, h: 1.5, type: 'rect', fill: 'transparent', opacity: 0.9, grad: RAINBOW_1 },
          { x: 12, y: 9, w: 76, h: 1.5, type: 'rect', fill: '#5B7CFA', opacity: 0.9, grad: FOREST },
          { x: 12, y: 12, w: 76, h: 1.5, type: 'rect', fill: '#3EBF8A', opacity: 0.9, grad: BLUEVIOLET },
        ],
      },
    },
  ];

  /* ── 工具函数 ── */
  function hexToRgb(hex, alpha) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    return alpha === undefined || alpha === 1
      ? 'rgb(' + r + ',' + g + ',' + b + ')'
      : 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }
  function isRgba(c) { return /^rgba?\(/i.test(c); }
  function toRgba(color, alpha) {
    if (isRgba(color)) return color;
    return hexToRgb(color, alpha);
  }
  function gradCss(stops, angle) {
    if (!stops || stops.length < 2) return undefined;
    var parts = stops.map(function (s) {
      return toRgba(s.color, s.alpha) + ' ' + Math.round(s.offset * 100) + '%';
    });
    return 'linear-gradient(' + (angle + 90) + 'deg,' + parts.join(',') + ')';
  }

  /* 照片槽位圆角 → CSS */
  function slotRadius(r) { return (r === 0 ? '0px' : (r || 4) + 'px'); }

  /* ── 渲染单个封面面（front / back） ── */
  function renderFace(host, face, photoIdx) {
    var base = face.slots || [];
    var texts = face.texts || [];
    var shapes = face.shapes || [];

    host.style.background = face.bg || '#FFFFFF';

    /* 1. 基础形状（非蒙版） */
    shapes.forEach(function (sh) {
      if (sh.id === 'mask') return;
      host.appendChild(renderShape(sh));
    });

    /* 2. 照片槽位 */
    base.forEach(function (s, i) {
      var el = document.createElement('div');
      el.className = 'cg-photo';
      el.style.cssText =
        'left:' + s.x + '%;top:' + s.y + '%;width:' + s.w + '%;height:' + s.h + '%;' +
        'border-radius:' + slotRadius(s.r) + ';' +
        'background-image:url(' + photoFor(photoIdx + i) + ');' +
        'box-shadow:inset 0 1px 2px rgba(0,0,0,0.10),inset 0 -1px 1px rgba(255,255,255,0.15),0 1px 2px rgba(0,0,0,0.10);';
      host.appendChild(el);
    });

    /* 3. 蒙版形状（照片之上、文字之下） */
    shapes.forEach(function (sh) {
      if (sh.id !== 'mask') return;
      host.appendChild(renderShape(sh));
    });

    /* 4. 文字 */
    texts.forEach(function (t) {
      host.appendChild(renderText(t));
    });
  }

  /* 形状渲染：矩形/圆/椭圆/线（对齐 CoverPreview 的 ShapePreview） */
  function renderShape(sh) {
    var el = document.createElement('div');
    el.className = 'cg-shape';
    var isEllipse = sh.type === 'circle' || sh.type === 'ellipse';
    var isLine = sh.type === 'line';
    var transparent = sh.fill === 'transparent' || sh.fill === 'rgba(0,0,0,0)';
    var grad = sh.grad && sh.grad.length >= 2 ? gradCss(sh.grad, sh.ga || 0) : undefined;
    var radius = isEllipse ? '50%' : isLine ? '0' : '2px';
    var bg = grad || toRgba(sh.fill, sh.opacity);

    var css =
      'left:' + sh.x + '%;top:' + sh.y + '%;width:' + sh.w + '%;height:' + sh.h + '%;' +
      'opacity:' + (sh.opacity == null ? 1 : sh.opacity) + ';';
    if (sh.rotation) css += 'transform:rotate(' + sh.rotation + 'deg);';
    if (isLine) {
      css += 'background:' + bg + ';';
    } else if (transparent && sh.strokeWidth > 0) {
      css += 'border:' + sh.strokeWidth + 'px solid ' + (sh.stroke || '#000') + ';border-radius:' + radius + ';';
    } else {
      css += 'background:' + bg + ';border-radius:' + radius + ';';
    }
    el.style.cssText = css;
    return el;
  }

  /* 文字渲染：fontSize/letterSpacing 用 cqw 等比缩放（对齐 CoverPreview PREVIEW_FONT_CQW=100/420） */
  function renderText(t) {
    var el = document.createElement('div');
    el.className = 'cg-text';
    var hasGrad = t.grad && t.grad.length >= 2;
    var span = document.createElement('span');
    span.textContent = t.text;
    if (hasGrad) {
      span.style.backgroundImage = gradCss(t.grad, t.ga || 0);
      span.style.backgroundClip = 'text';
      span.style.WebkitBackgroundClip = 'text';
      span.style.color = 'transparent';
      span.style.WebkitTextFillColor = 'transparent';
    } else {
      span.style.color = t.color;
    }
    var justify = t.align === 'left' ? 'flex-start' : t.align === 'right' ? 'flex-end' : 'center';
    el.style.cssText =
      'left:' + t.x + '%;top:' + t.y + '%;width:' + t.w + '%;height:' + t.h + '%;' +
      'font-size:' + (t.fs * 100 / 420).toFixed(3) + 'cqw;' +
      'font-family:' + (t.ff || SANS) + ';' +
      'font-weight:' + (t.bold ? 600 : 400) + ';' +
      'font-style:' + (t.italic ? 'italic' : 'normal') + ';' +
      'text-align:' + (t.align || 'center') + ';' +
      'justify-content:' + justify + ';align-items:' + justify + ';' +
      'line-height:' + (t.lh || 1.2) + ';' +
      (t.ls ? 'letter-spacing:' + (t.ls * 100 / 420).toFixed(3) + 'cqw;' : '');
    el.appendChild(span);
    return el;
  }

  /* ══════════ 自动循环翻页动画：封面 → 翻页 → 封底 → 翻页 → 封面 ══════════
   * 舞台：cover-flip-book 内 front/back 两个硬壳面。
   * 循环使用当前封面模板（front）+ 配套封底（back），每隔一段时间翻一页，
   * 动画效果对齐应用内 CoverFlipPreview（翻开淡出 → 新面落定）。
   */
  var flipBook = document.getElementById('cover-flip-book');
  var flipFront = document.getElementById('flip-front-content');
  var flipBack = document.getElementById('flip-back-content');
  var segDots = document.querySelectorAll('.cover-flip-hint .seg i');
  if (flipBook && flipFront && flipBack) {
    var flipIdx = 0;         // 当前展示的封面模板
    var flipToBack = false;  // 当前是封面还是封底
    var flipBusy = false;

    function renderFlipFace() {
      var cover = COVERS[flipIdx % COVERS.length];
      flipFront.innerHTML = '';
      flipFront.style.background = cover.bg || '#FFFFFF';
      renderFace(flipFront, cover, flipIdx);
      var back = cover.back;
      flipBack.innerHTML = '';
      flipBack.style.background = (back && back.bg) || '#FFFFFF';
      renderFace(flipBack, back || cover, flipIdx);
    }

    function setSeg(active) {
      segDots.forEach(function (d, i) { d.classList.toggle('on', i === active); });
    }

    function flipOnce(toBack) {
      if (flipBusy) return;
      flipBusy = true;
      flipBook.classList.remove('flip-to-back', 'flip-to-front');
      // 触发 reflow 确保动画重启
      void flipBook.offsetWidth;
      if (toBack) {
        // 封面 → 封底：先回到无 show-back 状态（封面可见），再播放翻页动画
        flipBook.classList.remove('show-back');
        flipBook.classList.add('flip-to-back');
      } else {
        // 封底 → 封面：show-back 仍在（封底可见），播放翻回动画
        flipBook.classList.add('flip-to-front');
      }
      window.setTimeout(function () {
        flipToBack = toBack;
        flipBook.classList.remove('flip-to-back', 'flip-to-front');
        if (toBack) flipBook.classList.add('show-back');   // 封底保持可见
        else flipBook.classList.remove('show-back');       // 回到封面
        setSeg(toBack ? 1 : 0);
        flipBusy = false;
      }, 880);
    }

    function autoLoop() {
      window.setTimeout(function () {
        if (document.hidden) { autoLoop(); return; }
        if (!flipToBack) {
          flipOnce(true);   // 封面 → 封底
        } else {
          flipOnce(false);  // 封底 → 封面
          // 回到封面后切换到下一款封面模板，形成 8 款轮播
          flipIdx = (flipIdx + 1) % COVERS.length;
          renderFlipFace();
        }
        autoLoop();
      }, 2600);
    }

    renderFlipFace();
    setSeg(0);
    autoLoop();
  }
})();

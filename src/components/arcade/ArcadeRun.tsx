"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NftItem } from "@/lib/types";
import { cyborgPunksNfts, getNftById } from "@/data/nfts";
import { RARITY_COLORS } from "@/lib/constants";
import { NeonButton } from "@/components/ui/NeonButton";
import { getPilotSpecial, isCpcPilot, type PilotSpecial } from "@/lib/pilot";
import { useLockedPilot } from "@/hooks/useLockedPilot";

type Phase = "select" | "run" | "over" | "clear";

const BASE_W = 240;
const BASE_H = 160;
const MAGENTA = "#DB3FFD";
const CYAN = "#0CF1FF";
const GOLD = "#FFC825";
const VOID = "#05010a";
const RED = "#FF2A2A";
const RED_HOT = "#FF4D4D";
const ENEMY_GRAY = "#2a2a2e";
const ENEMY_DIRT = "#8a3a6a";
const WAVE_MS = 14000;
const BOSS_HP = 168;
const HP_BASE = 5;
const HP_CAP = 8;
const SHIELD_HITS = 5;
const SPECIAL_CD = 5000;

type Bullet = {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  vx: number;
  pierce: number;
  dmg: number;
  foe: boolean;
};

type Mob = {
  x: number;
  y: number;
  w: number;
  h: number;
  hp: number;
  vx: number;
  vy: number;
  kind: "grunt" | "runner" | "heavy" | "boss";
  fire: number;
  walk: number;
};

type Drop = {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  kind: "life" | "gun";
  age: number;
};

type Pixel = { x: number; y: number; s: number; vy: number; color: string };

function portraitSrc(nft: NftItem): string {
  return nft.video || nft.image;
}

function aabb(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export function ArcadeRun() {
  const { pilotId, lockPilot } = useLockedPilot();
  const [phase, setPhase] = useState<Phase>("select");
  const [pilot, setPilot] = useState<NftItem | null>(null);
  const [score, setScore] = useState(0);
  const [hp, setHp] = useState(HP_BASE);
  const [maxHp, setMaxHp] = useState(HP_BASE);
  const [gun, setGun] = useState(1);
  const [hudFlash, setHudFlash] = useState<"life" | "gun" | null>(null);
  const [specialHud, setSpecialHud] = useState("SPECIAL READY");
  const [wave, setWave] = useState(1);
  const [bossHp, setBossHp] = useState(0);
  const [scale, setScale] = useState(2);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("select");
  const specialRef = useRef<PilotSpecial>(getPilotSpecial(cyborgPunksNfts[0]));
  const shieldRef = useRef(SHIELD_HITS);
  const specialCdRef = useRef(0);
  const specialOnRef = useRef(0);
  const xrayPulseRef = useRef(0);
  const flashRef = useRef(0);
  const scoreRef = useRef(0);
  const hpRef = useRef(HP_BASE);
  const maxHpRef = useRef(HP_BASE);
  const gunRef = useRef(1);
  const waveRef = useRef(1);
  const waveTime = useRef(0);
  const bossHpRef = useRef(0);
  const player = useRef({
    x: BASE_W / 2 - 7,
    y: BASE_H - 28,
    w: 14,
    h: 12,
    inv: 0,
    cool: 0,
    charge: 0,
    dash: 0,
  });
  const keys = useRef({
    l: false,
    r: false,
    u: false,
    d: false,
    fire: false,
    special: false,
  });
  const bullets = useRef<Bullet[]>([]);
  const mobs = useRef<Mob[]>([]);
  const drops = useRef<Drop[]>([]);
  const pixels = useRef<Pixel[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const touchDrag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    playerX: number;
    playerY: number;
  } | null>(null);
  const spawnAcc = useRef(0);
  const lastTs = useRef(0);
  const raf = useRef(0);
  const lastHud = useRef(0);
  const lastSpecialHud = useRef("SPECIAL READY");

  const special = pilot ? getPilotSpecial(pilot) : null;

  const setPhaseSync = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const lockFromNft = (nft: NftItem) => {
    if (!isCpcPilot(nft.id)) return;
    setPilot(nft);
    lockPilot(nft.id);
  };

  useEffect(() => {
    if (!pilotId) return;
    const found = getNftById(pilotId);
    if (found && isCpcPilot(found.id)) setPilot(found);
  }, [pilotId]);

  const resetRun = useCallback(() => {
    const hpMax = HP_BASE;
    player.current = {
      x: BASE_W / 2 - 7,
      y: BASE_H - 28,
      w: 14,
      h: 12,
      inv: 0,
      cool: 0,
      charge: 0,
      dash: 0,
    };
    bullets.current = [];
    mobs.current = [];
    drops.current = [];
    gunRef.current = 1;
    shieldRef.current = SHIELD_HITS;
    specialCdRef.current = 0;
    specialOnRef.current = 0;
    xrayPulseRef.current = 0;
    flashRef.current = 0;
    pixels.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * BASE_W,
      y: Math.random() * BASE_H,
      s: Math.random() < 0.5 ? 1 : 2,
      vy: 0.4 + Math.random() * 1.1,
      color: Math.random() < 0.5 ? CYAN : MAGENTA,
    }));
    spawnAcc.current = 0;
    lastTs.current = 0;
    waveTime.current = 0;
    waveRef.current = 1;
    bossHpRef.current = 0;
    scoreRef.current = 0;
    hpRef.current = hpMax;
    maxHpRef.current = hpMax;
    setScore(0);
    setHp(hpMax);
    setMaxHp(hpMax);
    setGun(1);
    setHudFlash(null);
    setSpecialHud("SPECIAL READY");
    setWave(1);
    setBossHp(0);
  }, []);

  const startRun = () => {
    if (!pilot) return;
    specialRef.current = getPilotSpecial(pilot);
    resetRun();
    setPhaseSync("run");
  };

  const changePilot = () => {
    setPhaseSync("select");
  };

  useEffect(() => {
    const fit = () => {
      const w = wrapRef.current?.clientWidth ?? 480;
      setScale(Math.max(2, Math.min(3, Math.floor(w / BASE_W))));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.l = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.r = true;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") keys.current.u = true;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.current.d = true;
      if (e.key === "Enter") {
        if (phaseRef.current === "select" && pilot) startRun();
        if (phaseRef.current === "over" || phaseRef.current === "clear") startRun();
      }
      if (e.key === " " || e.key === "x" || e.key === "X") {
        e.preventDefault();
        keys.current.special = true;
      }
      if (e.key === "z" || e.key === "Z") keys.current.fire = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.l = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.r = false;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") keys.current.u = false;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.current.d = false;
      if (e.key === " " || e.key === "x" || e.key === "X") keys.current.special = false;
      if (e.key === "z" || e.key === "Z") keys.current.fire = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pilot]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = (ts: number) => {
      ctx.imageSmoothingEnabled = false;
      raf.current = requestAnimationFrame(tick);
      if (phaseRef.current !== "run") {
        draw(ctx);
        return;
      }
      const dt = lastTs.current ? Math.min(32, ts - lastTs.current) : 16;
      lastTs.current = ts;
      step(dt);
      draw(ctx);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale, phase]);

  function beep(freq: number) {
    try {
      const ac = new AudioContext();
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "square";
      o.frequency.value = freq;
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(ac.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.09);
      o.stop(ac.currentTime + 0.1);
    } catch {
      /* ignore autoplay */
    }
  }

  function flashHud(kind: "life" | "gun") {
    setHudFlash(kind);
    window.setTimeout(() => setHudFlash(null), 220);
    beep(kind === "life" ? 520 : 780);
  }

  function firePlayer() {
    const p = player.current;
    const laser = specialRef.current.id === "laser" && specialOnRef.current > 0;
    const dmg = laser ? 2 : 1;
    const level = gunRef.current;
    const w = laser || level >= 3 ? 3 : 2;
    const h = laser ? 10 : 5;
    const shots =
      level >= 3 ? [-6, 0, 6] : level === 2 ? [-4, 4] : [0];
    for (const ox of shots) {
      bullets.current.push({
        x: p.x + p.w / 2 - w / 2 + ox,
        y: p.y - (laser ? 10 : 4),
        w,
        h,
        vy: laser ? -4.2 : -3.2,
        vx: ox === 0 ? 0 : ox * 0.06,
        pierce: laser ? 2 : 0,
        dmg,
        foe: false,
      });
    }
  }

  function xrayPulse() {
    flashRef.current = 180;
    beep(280);
    for (const m of mobs.current) {
      if (m.hp <= 0) continue;
      const dmg = m.kind === "boss" ? 12 : 99;
      m.hp -= dmg;
      if (m.kind === "boss") {
        bossHpRef.current = Math.max(0, m.hp);
        setBossHp(bossHpRef.current);
      }
      if (m.hp <= 0 && m.kind !== "boss") {
        addScore(m.kind === "heavy" ? 60 : 25);
        maybeDrop(m.x, m.y);
      }
      if (m.kind === "boss" && m.hp <= 0) {
        setScore(Math.floor(scoreRef.current));
        setPhaseSync("clear");
      }
    }
  }

  function executeSpecial() {
    if (specialCdRef.current > 0 || specialOnRef.current > 0) return;
    const id = specialRef.current.id;
    specialCdRef.current = id === "cloak" ? 6000 : SPECIAL_CD;
    beep(240);
    if (id === "xray") {
      specialOnRef.current = 2000;
      xrayPulseRef.current = 1200;
      xrayPulse();
      return;
    }
    if (id === "cloak") specialOnRef.current = 5000;
    if (id === "laser") specialOnRef.current = 6000;
    if (id === "melee") specialOnRef.current = 5000;
    if (id === "breach") specialOnRef.current = 4000;
  }

  function spawnFoeBullet(x: number, y: number, vx = 0, vy = 1.5) {
    bullets.current.push({
      x,
      y,
      w: 4,
      h: 5,
      vy,
      vx,
      pierce: 0,
      dmg: 1,
      foe: true,
    });
  }

  function maybeDrop(x: number, y: number) {
    if (Math.random() > 0.22) return;
    drops.current.push({
      x,
      y,
      w: 8,
      h: 8,
      vy: 0.55,
      kind: Math.random() < 0.5 ? "life" : "gun",
      age: 0,
    });
  }

  function hitPlayer() {
    const p = player.current;
    if (specialRef.current.id === "cloak" && specialOnRef.current > 0) return;
    if (p.inv > 0) return;
    if (shieldRef.current > 0) {
      shieldRef.current -= 1;
      p.inv = 280;
      return;
    }
    hpRef.current = Math.max(0, hpRef.current - 1);
    p.inv = 800;
    setHp(hpRef.current);
    if (hpRef.current <= 0) {
      setScore(Math.floor(scoreRef.current));
      setPhaseSync("over");
    }
  }

  function addScore(n: number) {
    scoreRef.current += n;
  }

  function spawnWaveMobs(wave: number) {
    const roll = Math.random();
    const kind: Mob["kind"] =
      roll < 0.22 + wave * 0.04 ? "heavy" : roll < 0.5 ? "runner" : "grunt";
    const size = kind === "heavy" ? 16 : kind === "runner" ? 10 : 12;
    mobs.current.push({
      x: 10 + Math.random() * (BASE_W - 30),
      y: -18,
      w: size,
      h: kind === "heavy" ? 20 : 16,
      hp: kind === "heavy" ? 4 : kind === "runner" ? 1 : 2,
      vx:
        kind === "runner"
          ? (Math.random() < 0.5 ? -1 : 1) * (0.9 + wave * 0.12)
          : kind === "grunt"
            ? 0.35
            : 0.18,
      vy: kind === "runner" ? 0.85 + wave * 0.1 : 0.32 + wave * 0.08,
      kind,
      fire: kind === "grunt" ? 200 + Math.random() * 500 : 900,
      walk: 0,
    });
  }

  function spawnBoss() {
    bossHpRef.current = BOSS_HP;
    setBossHp(BOSS_HP);
    mobs.current.push({
      x: BASE_W / 2 - 18,
      y: 6,
      w: 36,
      h: 40,
      hp: BOSS_HP,
      vx: 0.5,
      vy: 0,
      kind: "boss",
      fire: 0,
      walk: 0,
    });
  }

  function step(dt: number) {
    const p = player.current;
    const spec = specialRef.current;
    const melee = spec.id === "melee" && specialOnRef.current > 0;
    const spd = (melee ? 0.135 : 0.09) * dt;
    if (keys.current.l) p.x -= spd;
    if (keys.current.r) p.x += spd;
    if (keys.current.u) p.y -= spd;
    if (keys.current.d) p.y += spd;
    if (pointer.current) {
      p.x += (pointer.current.x - p.w / 2 - p.x) * 0.18;
      p.y += (pointer.current.y - p.h / 2 - p.y) * 0.18;
    }
    p.x = Math.max(2, Math.min(BASE_W - p.w - 2, p.x));
    p.y = Math.max(18, Math.min(BASE_H - p.h - 4, p.y));
    if (p.inv > 0) p.inv -= dt;
    if (p.cool > 0) p.cool -= dt;
    if (specialOnRef.current > 0) specialOnRef.current = Math.max(0, specialOnRef.current - dt);
    if (specialCdRef.current > 0) specialCdRef.current = Math.max(0, specialCdRef.current - dt);
    if (flashRef.current > 0) flashRef.current = Math.max(0, flashRef.current - dt);
    if (xrayPulseRef.current > 0) {
      xrayPulseRef.current = Math.max(0, xrayPulseRef.current - dt);
      if (xrayPulseRef.current === 0 && specialRef.current.id === "xray") {
        xrayPulse();
      }
    }
    if (keys.current.special) {
      executeSpecial();
      keys.current.special = false;
    }

    const cd = spec.id === "laser" && specialOnRef.current > 0 ? 90 : 260;
    if (keys.current.fire && p.cool <= 0) {
      firePlayer();
      p.cool = cd;
    }

    const specLabel =
      specialCdRef.current <= 0
        ? "SPECIAL READY"
        : specialRef.current.id === "cloak"
          ? `CD ${(specialCdRef.current / 1000).toFixed(1)}`
          : `CD ${Math.max(0, Math.ceil(specialCdRef.current / 1000) - 1)}`;
    if (specLabel !== lastSpecialHud.current) {
      lastSpecialHud.current = specLabel;
      setSpecialHud(specLabel);
    }

    waveTime.current += dt;
    if (waveRef.current <= 4) {
      spawnAcc.current += dt;
      const every = Math.max(320, 900 - waveRef.current * 110);
      if (spawnAcc.current >= every) {
        spawnAcc.current = 0;
        spawnWaveMobs(waveRef.current);
      }
      if (waveTime.current >= WAVE_MS) {
        waveTime.current = 0;
        if (waveRef.current < 4) {
          waveRef.current += 1;
          setWave(waveRef.current);
        } else {
          waveRef.current = 5;
          setWave(5);
          spawnBoss();
        }
      }
    }

    const boss = mobs.current.find((m) => m.kind === "boss");
    if (boss) {
      boss.x += boss.vx * (dt / 16);
      if (boss.x < 6 || boss.x + boss.w > BASE_W - 6) boss.vx *= -1;
      boss.fire += dt;
      const bossLock = specialRef.current.id === "breach" && specialOnRef.current > 0;
      if (!bossLock && boss.fire > 820) {
        boss.fire = 0;
        if (Math.random() < 0.4) {
          boss.vx = (p.x < boss.x ? -1 : 1) * 1.35;
        } else {
          for (const ox of [-14, -7, 0, 7, 14]) {
            spawnFoeBullet(boss.x + boss.w / 2 + ox - 2, boss.y + boss.h, ox * 0.05, 1.35);
          }
        }
      }
    }

    for (const m of mobs.current) {
      if (m.kind === "boss") continue;
      m.walk += dt;
      m.x += m.vx * (dt / 16);
      m.y += m.vy * (dt / 16);
      if (m.x < 2 || m.x + m.w > BASE_W - 2) m.vx *= -1;
      if (m.kind === "grunt" && m.walk > 420) {
        m.walk = 0;
        m.vx *= -1;
      }
      const locked = specialRef.current.id === "breach" && specialOnRef.current > 0;
      if (!locked && (m.kind === "grunt" || m.kind === "heavy")) {
        m.fire -= dt;
        if (m.fire <= 0) {
          m.fire = m.kind === "heavy" ? 1400 : 900;
          spawnFoeBullet(
            m.x + m.w / 2 - 2,
            m.y + m.h,
            0,
            m.kind === "heavy" ? 1.2 : 1.55,
          );
        }
      }
    }

    for (const b of bullets.current) {
      b.y += b.vy * (dt / 16) * 2.2;
      b.x += b.vx * (dt / 16) * 2.2;
    }

    for (const b of bullets.current) {
      if (b.foe) {
        if (aabb(p.x, p.y, p.w, p.h, b.x, b.y, b.w, b.h)) {
          b.y = -99;
          hitPlayer();
        }
        continue;
      }
      for (const m of mobs.current) {
        if (m.hp <= 0) continue;
        if (aabb(b.x, b.y, b.w, b.h, m.x, m.y, m.w, m.h)) {
          const mul =
            specialRef.current.id === "breach" && specialOnRef.current > 0 ? 2 : 1;
          m.hp -= b.dmg * mul;
          if (b.pierce > 0) b.pierce -= 1;
          else b.y = -99;
          if (m.kind === "boss") {
            bossHpRef.current = Math.max(0, m.hp);
            setBossHp(bossHpRef.current);
          }
          if (m.hp <= 0) {
            addScore(
              m.kind === "boss" ? 500 : m.kind === "heavy" ? 60 : m.kind === "runner" ? 35 : 25,
            );
            if (m.kind !== "boss") maybeDrop(m.x + m.w / 2 - 4, m.y + m.h / 2);
            if (m.kind === "boss") {
              setScore(Math.floor(scoreRef.current));
              setPhaseSync("clear");
            }
          }
        }
      }
    }

    bullets.current = bullets.current.filter(
      (b) => b.y > -12 && b.y < BASE_H + 12 && b.x > -8 && b.x < BASE_W + 8,
    );
    mobs.current = mobs.current.filter((m) => m.hp > 0 && m.y < BASE_H + 20);

    for (const d of drops.current) {
      d.y += d.vy * (dt / 16);
      d.age += dt;
      if (aabb(p.x, p.y, p.w, p.h, d.x, d.y, d.w, d.h)) {
        d.y = BASE_H + 40;
        if (d.kind === "life") {
          hpRef.current = Math.min(HP_CAP, hpRef.current + 1);
          maxHpRef.current = Math.min(HP_CAP, Math.max(maxHpRef.current, hpRef.current));
          setHp(hpRef.current);
          setMaxHp(maxHpRef.current);
          flashHud("life");
        } else {
          gunRef.current = Math.min(3, gunRef.current + 1);
          setGun(gunRef.current);
          flashHud("gun");
        }
      }
    }
    drops.current = drops.current.filter((d) => d.y < BASE_H + 12);

    for (const m of mobs.current) {
      if (!aabb(p.x, p.y, p.w, p.h, m.x, m.y, m.w, m.h)) continue;
      if (specialRef.current.id === "melee" && specialOnRef.current > 0) {
        if (m.kind === "boss") {
          m.hp -= 8;
          bossHpRef.current = Math.max(0, m.hp);
          setBossHp(bossHpRef.current);
          p.inv = Math.max(p.inv, 200);
          if (m.hp <= 0) {
            setScore(Math.floor(scoreRef.current));
            setPhaseSync("clear");
          }
        } else {
          m.hp = 0;
          addScore(40);
          maybeDrop(m.x, m.y);
        }
      } else {
        hitPlayer();
      }
    }

    for (const star of pixels.current) {
      star.y += star.vy * (dt / 16) * (1 + waveRef.current * 0.08);
      if (star.y > BASE_H) {
        star.y = -2;
        star.x = Math.random() * BASE_W;
      }
    }

    addScore(dt * 0.02);
    const shown = Math.floor(scoreRef.current);
    if (shown !== lastHud.current) {
      lastHud.current = shown;
      setScore(shown);
    }
  }

  function drawCyborg(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    kind: Mob["kind"],
    glitch: boolean,
  ) {
    const w = kind === "boss" ? 36 : kind === "heavy" ? 16 : kind === "runner" ? 10 : 12;
    const h = kind === "boss" ? 40 : kind === "heavy" ? 20 : 16;
    const cx = x + Math.floor(w / 2);
    if (glitch && Math.floor(performance.now() / 80) % 2 === 0) {
      ctx.fillStyle = MAGENTA;
      ctx.fillRect(x + 1, y + 2, w - 2, h - 4);
    }
    ctx.fillStyle = ENEMY_GRAY;
    ctx.fillRect(cx - 3, y + 7, 6, h - 10);
    ctx.fillRect(cx - 5, y + 8, 3, 5);
    ctx.fillRect(cx + 2, y + 8, 3, 5);
    ctx.fillRect(cx - 4, y + h - 4, 3, 4);
    ctx.fillRect(cx + 1, y + h - 4, 3, 4);
    ctx.fillStyle = "#141416";
    ctx.fillRect(cx - 4, y, 8, 8);
    ctx.fillStyle = RED_HOT;
    ctx.fillRect(cx - 1, y + 3, 2, 2);
    ctx.fillStyle = ENEMY_DIRT;
    ctx.fillRect(cx - 1, y + 10, 5, 3);
    ctx.fillStyle = RED;
    ctx.fillRect(cx, y + 13, 3, 3);
    if (kind === "heavy" || kind === "boss") {
      ctx.fillStyle = ENEMY_DIRT;
      ctx.fillRect(x + 1, y + 9, 4, 5);
      ctx.fillRect(x + w - 5, y + 9, 4, 5);
    }
    if (kind === "boss") {
      ctx.fillStyle = ENEMY_GRAY;
      ctx.fillRect(x + 6, y + 16, w - 12, 14);
      ctx.fillStyle = "#0e0e10";
      ctx.fillRect(cx - 8, y + 1, 16, 12);
      ctx.fillStyle = RED;
      ctx.fillRect(cx - 2, y + 5, 4, 3);
      ctx.fillStyle = RED_HOT;
      ctx.fillRect(cx - 1, y + 22, 6, 4);
    }
  }

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = VOID;
    ctx.fillRect(0, 0, BASE_W, BASE_H);
    for (const star of pixels.current) {
      ctx.fillStyle = star.color;
      ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.s, star.s);
    }

    const breach = specialRef.current.id === "breach" && specialOnRef.current > 0;
    for (const m of mobs.current) {
      drawCyborg(ctx, Math.floor(m.x), Math.floor(m.y), m.kind, breach);
    }

    for (const d of drops.current) {
      const x = Math.floor(d.x);
      const y = Math.floor(d.y);
      const blink = Math.floor(d.age / 140) % 2 === 0;
      if (d.kind === "life") {
        const c = blink ? RED_HOT : RED;
        ctx.fillStyle = c;
        ctx.fillRect(x + 1, y, 2, 2);
        ctx.fillRect(x + 5, y, 2, 2);
        ctx.fillRect(x, y + 2, 8, 3);
        ctx.fillRect(x + 1, y + 5, 6, 2);
        ctx.fillRect(x + 3, y + 7, 2, 1);
      } else {
        ctx.fillStyle = blink ? "#7af8ff" : CYAN;
        ctx.fillRect(x + 3, y, 2, 8);
        ctx.fillRect(x + 1, y + 2, 6, 4);
        ctx.fillRect(x, y + 3, 8, 2);
      }
    }

    for (const b of bullets.current) {
      const x = Math.floor(b.x);
      const y = Math.floor(b.y);
      if (b.foe) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(x - 1, y - 1, b.w + 2, b.h + 2);
        ctx.fillStyle = RED;
        ctx.fillRect(x, y, b.w, b.h);
        ctx.fillStyle = RED_HOT;
        ctx.fillRect(x + 1, y + 1, Math.max(1, b.w - 2), Math.max(1, b.h - 2));
      } else if (specialRef.current.id === "laser" && specialOnRef.current > 0) {
        ctx.fillStyle = MAGENTA;
        ctx.fillRect(x, y, b.w, b.h);
        ctx.fillStyle = CYAN;
        ctx.fillRect(x, y, 1, b.h);
        ctx.fillRect(x + b.w - 1, y, 1, b.h);
      } else {
        ctx.fillStyle = CYAN;
        ctx.fillRect(x, y, b.w, b.h);
      }
    }

    const p = player.current;
    const cloaked = specialRef.current.id === "cloak" && specialOnRef.current > 0;
    const blink = phaseRef.current === "run" && p.inv > 0 && Math.floor(p.inv / 70) % 2 === 0;
    if (!blink || cloaked) {
      const x = Math.floor(p.x);
      const y = Math.floor(p.y);
      if (shieldRef.current > 0) {
        const cx = x + Math.floor(p.w / 2);
        const cy = y + Math.floor(p.h / 2);
        ctx.strokeStyle = CYAN;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = cloaked ? 0.4 : 1;
      ctx.fillStyle = "#1a1030";
      ctx.fillRect(x, y + 4, p.w, 8);
      ctx.fillStyle = CYAN;
      ctx.fillRect(x + 6, y, 2, 6);
      ctx.fillRect(x + 2, y + 5, 2, 2);
      ctx.fillRect(x + 10, y + 5, 2, 2);
      ctx.fillStyle = MAGENTA;
      ctx.fillRect(x + 1, y + 9, 2, 2);
      ctx.fillRect(x + 11, y + 9, 2, 2);
      ctx.globalAlpha = 1;
    }

    if (shieldRef.current > 0) {
      ctx.fillStyle = "#083038";
      ctx.fillRect(20, BASE_H - 6, 200, 3);
      ctx.fillStyle = CYAN;
      ctx.fillRect(
        20,
        BASE_H - 6,
        Math.max(1, Math.floor((200 * shieldRef.current) / SHIELD_HITS)),
        3,
      );
    }

    if (flashRef.current > 0) {
      ctx.fillStyle = "rgba(180, 80, 255, 0.28)";
      ctx.fillRect(0, 0, BASE_W, BASE_H);
    }

    if (bossHpRef.current > 0 && waveRef.current >= 5) {
      const barX = 20;
      const barY = 3;
      const barW = 64;
      const barH = 4;
      const gap = 4;
      const segmentHp = BOSS_HP / 3;

      for (let i = 0; i < 3; i += 1) {
        const segmentX = barX + i * (barW + gap);
        const segmentHpRemaining = Math.max(
          0,
          Math.min(segmentHp, bossHpRef.current - i * segmentHp),
        );
        const fillW = Math.floor((barW * segmentHpRemaining) / segmentHp);

        ctx.fillStyle = "#3003D9";
        ctx.fillRect(segmentX, barY, barW, barH);
        if (fillW > 0) {
          ctx.fillStyle = MAGENTA;
          ctx.fillRect(segmentX, barY, fillW, barH);
        }
      }
    }
  }

  function canvasPoint(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * BASE_W,
      y: ((e.clientY - rect.top) / rect.height) * BASE_H,
    };
  }

  function onPointer(e: React.PointerEvent<HTMLCanvasElement>) {
    if (phaseRef.current !== "run") return;
    pointer.current = canvasPoint(e);
    keys.current.fire = true;
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (phaseRef.current !== "run") return;

    if (e.pointerType === "touch") {
      const point = canvasPoint(e);
      touchDrag.current = {
        pointerId: e.pointerId,
        startX: point.x,
        startY: point.y,
        playerX: player.current.x,
        playerY: player.current.y,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      pointer.current = null;
      return;
    }

    onPointer(e);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (phaseRef.current !== "run") return;

    if (e.pointerType === "touch") {
      const drag = touchDrag.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      const point = canvasPoint(e);
      pointer.current = {
        x: drag.playerX + (point.x - drag.startX) + player.current.w / 2,
        y: drag.playerY + (point.y - drag.startY) + player.current.h / 2,
      };
      return;
    }

    onPointer(e);
  }

  function onPointerEnd(e: React.PointerEvent<HTMLCanvasElement>) {
    if (e.pointerType === "touch") {
      if (touchDrag.current?.pointerId === e.pointerId) {
        touchDrag.current = null;
        pointer.current = null;
      }
      return;
    }

    pointer.current = null;
    keys.current.fire = false;
  }

  const rarityClass = pilot
    ? (RARITY_COLORS[pilot.rarity] ?? RARITY_COLORS.common)
    : "";
  const inPlay = phase === "run" || phase === "over" || phase === "clear";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-3 px-3 py-4 sm:px-4">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-sans text-[8px] uppercase tracking-[0.18em] text-neon-cyan">
            Arcade // Rail Dodge
          </p>
          <h1 className="font-sans text-sm tracking-wide text-[#DB3FFD] sm:text-base">
            {phase === "select" ? "SELECT PILOT" : "RAIL DODGE"}
          </h1>
        </div>
        {inPlay && (
          <div className="flex flex-wrap items-center gap-3 font-sans text-[10px] uppercase tracking-wider text-neon-cyan">
            <span>SCORE {String(score).padStart(6, "0")}</span>
            <span className={`text-[#DB3FFD] ${hudFlash === "life" ? "text-[#FF4D4D]" : ""}`}>
              HP {hp}/{maxHp}
            </span>
            <span className={hudFlash === "gun" ? "text-neon-cyan" : ""}>
              GUN {gun}
            </span>
            <span className="text-neon-cyan">{specialHud}</span>
            <span>{wave >= 5 ? "BOSS" : `WAVE ${wave}`}</span>
          </div>
        )}
      </header>

      {phase === "select" && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            {cyborgPunksNfts.map((nft) => {
              const active = pilot?.id === nft.id;
              const p = getPilotSpecial(nft);
              return (
                <button
                  key={nft.id}
                  type="button"
                  onClick={() => lockFromNft(nft)}
                  className={`circuit-frame overflow-hidden bg-[#05010a] text-left ${
                    active ? "pilot-locked" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={portraitSrc(nft)}
                    alt={nft.title}
                    className="aspect-square w-full object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div className="p-2">
                    <p className="font-mono text-[10px] text-neon-cyan">{nft.id}</p>
                    <p className="font-sans text-[8px] uppercase tracking-wide text-[#DB3FFD]">
                      {nft.title}
                    </p>
                    {active && (
                      <p className="mt-1 font-sans text-[8px] uppercase tracking-wide text-[#FFC825]">
                        {p.name}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {pilot && special && (
            <p className="text-center font-mono text-[13.5pt] leading-[1.55] text-muted">
              SPECIAL // {special.name} — {special.blurb}
            </p>
          )}
          <div className="flex justify-center pt-1">
            <NeonButton onClick={startRun} disabled={!pilot}>
              Start Run
            </NeonButton>
          </div>
        </>
      )}

      {inPlay && (
        <>
          <div ref={wrapRef} className="circuit-frame relative mx-auto w-full max-w-[720px] bg-black p-2">
            <canvas
              ref={canvasRef}
              width={BASE_W}
              height={BASE_H}
              className="mx-auto block"
              style={{
                width: BASE_W * scale,
                height: BASE_H * scale,
                imageRendering: "pixelated",
                maxWidth: "100%",
      touchAction: "none",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
              onPointerLeave={onPointerEnd}
            />
            {phase === "run" && (
            <div className="flex justify-center py-2 md:hidden">
              <button
                type="button"
                onClick={executeSpecial}
                disabled={specialHud !== "SPECIAL READY"}
                className={`border-2 bg-black px-6 py-2 font-sans text-[10px] uppercase tracking-[0.2em] transition-opacity active:opacity-70 ${
                  specialHud === "SPECIAL READY"
                    ? "border-[#FFC825] text-[#FFC825]"
                    : "border-zinc-700 text-zinc-600 opacity-60"
                }`}
              >
                SPECIAL
              </button>
            </div>
          )}

          {(phase === "over" || phase === "clear") && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 font-sans text-[10px] uppercase tracking-wider text-neon-cyan">
                <p className="text-[#DB3FFD]">
                  {phase === "clear" ? "RUN CLEAR" : "SIGNAL LOST"}
                </p>
                <p>SCORE {String(score).padStart(6, "0")}</p>
              </div>
            )}
          </div>

          {(phase === "over" || phase === "clear") && (
            <div className="flex flex-wrap justify-center gap-2">
              <NeonButton onClick={startRun}>Reboot</NeonButton>
            </div>
          )}

          {pilot && special && (
            <div className="circuit-frame grid grid-cols-[68px_minmax(0,1fr)] grid-rows-[auto_auto] items-start gap-1 bg-[#05010a] p-1 md:flex md:items-center md:gap-3 md:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="col-start-1 row-start-1 flex h-16 w-16 shrink-0 items-center justify-center">
                <img
                  src={portraitSrc(pilot)}
                  alt={pilot.title}
                  className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                  style={{
                    imageRendering: "pixelated",
                    outline: "3px solid #FFC825",
                  }}
                />
              </div>
              <div className="col-start-2 row-start-1 min-w-0 px-1.5 py-1 md:flex-1 md:px-0 md:py-0">
                <p className="whitespace-nowrap font-sans text-[4px] uppercase tracking-[0.06em] text-neon-cyan sm:text-[8px] sm:tracking-[0.2em]">
                  Status // Linked
                </p>
                <div className="flex min-w-0 items-baseline gap-1 whitespace-nowrap">
                  <p className="shrink-0 font-mono text-[4.5px] leading-none text-foreground sm:text-[13.5pt] sm:leading-[1.55]">
                    {pilot.id}
                  </p>
                  <p className="shrink-0 font-sans text-[6px] uppercase tracking-wide text-[#DB3FFD] sm:text-[10px]">
                    {pilot.title}
                  </p>
                </div>
                <p className="mt-0.5 whitespace-nowrap font-sans text-[5.5px] uppercase tracking-[0.02em] text-[#FFC825] sm:mt-1 sm:text-[8px]">
                  Special // {special.name}
                </p>
                <span
                  className={`mt-0.5 hidden border bg-black px-1 py-0.5 font-sans text-[4.5px] uppercase sm:mt-1 sm:border-2 sm:px-1.5 sm:py-0.5 sm:text-[8px] md:inline-block ${rarityClass}`}
                >
                  {pilot.rarity}
                </span>
              </div>
              <div
                className={`col-start-1 row-start-2 justify-self-center md:hidden`}
              >
                <span
                  className={`inline-block border bg-black px-1 py-0.5 font-sans text-[4.5px] uppercase ${rarityClass}`}
                >
                  {pilot.rarity}
                </span>
              </div>
              <div className="col-start-2 row-start-2 w-full justify-self-stretch md:col-auto md:row-auto md:w-auto md:shrink-0 md:justify-self-auto">
                <NeonButton
                  variant="outline"
                  onClick={changePilot}
                  className="w-full !px-3 !py-2 !text-[7px] !tracking-[0.1em] md:w-auto md:!px-4 md:!py-2.5 md:!text-[10px]"
                >
                  Change Pilot
                </NeonButton>
              </div>
            </div>
          )}        </>
      )}
    </div>
  );
}

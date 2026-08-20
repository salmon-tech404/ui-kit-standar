import React from 'react';

export interface ConcentricRadiusDiagramProps {
  radiusOuter: number;
  padding: number;
  radiusInner?: number;
  isConcentricEnabled?: boolean;
}

export const ConcentricRadiusDiagram: React.FC<ConcentricRadiusDiagramProps> = ({
  radiusOuter = 16,
  padding = 12,
  radiusInner,
  isConcentricEnabled = true,
}) => {
  const computedInner =
    radiusInner !== undefined
      ? radiusInner
      : isConcentricEnabled
      ? Math.max(0, radiusOuter - padding)
      : radiusOuter;

  return (
    <div className="space-y-3 select-none text-xs">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        <span>Concentric Geometry Inspector</span>
        <span className="font-mono text-indigo-500 lowercase">
          {isConcentricEnabled ? 'concentric: active' : 'independent: false'}
        </span>
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
        {/* Outer Container (R_outer) */}
        <div
          style={{
            borderRadius: `${radiusOuter}px`,
            padding: `${padding}px`,
          }}
          className="w-full max-w-[240px] h-28 bg-indigo-950/60 border-2 border-dashed border-indigo-400 flex items-center justify-center transition-all relative shadow-lg mx-auto"
        >
          {/* Label R_outer */}
          <div className="absolute -top-2.5 left-3 px-1.5 py-0.5 bg-indigo-600 rounded text-[9px] font-mono font-bold text-white shadow-xs">
            R_outer: {radiusOuter}px
          </div>

          {/* Inner Nested Container (R_inner) */}
          <div
            style={{
              borderRadius: `${computedInner}px`,
            }}
            className="w-full h-full bg-indigo-500/20 border-2 border-dashed border-emerald-400 flex flex-col items-center justify-center transition-all relative"
          >
            {/* Label R_inner */}
            <div className="text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1">
              <span>⟷ R_inner: {computedInner}px ⟷</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              Padding: {padding}px
            </div>
          </div>
        </div>

        {/* Math Formula Readout */}
        <div className="w-full p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] font-mono text-center text-indigo-300">
          R_inner = max(0, {radiusOuter}px - {padding}px) = <strong className="text-emerald-400">{computedInner}px</strong>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export interface F12BoxModelDiagramProps {
  componentName?: string;
  paddingX?: number;
  paddingY?: number;
  marginX?: number;
  marginY?: number;
  borderWidth?: number;
  contentWidth?: number | string;
  contentHeight?: number | string;
}

export const F12BoxModelDiagram: React.FC<F12BoxModelDiagramProps> = ({
  componentName = 'Component',
  paddingX = 16,
  paddingY = 8,
  marginX = 0,
  marginY = 0,
  borderWidth = 1,
  contentWidth = 'auto',
  contentHeight = 'auto',
}) => {
  return (
    <div className="w-full space-y-2 select-none text-xs">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        <span>F12 Box Model Inspector</span>
        <span className="font-mono text-[10px] text-indigo-500 lowercase">border-box</span>
      </div>

      {/* Layer 1: MARGIN (Cam) */}
      <div className="w-full bg-amber-500/10 dark:bg-amber-950/30 border border-dashed border-amber-400 dark:border-amber-600 rounded-lg p-1.5 relative text-center">
        <div className="absolute left-1.5 top-0.5 text-[8px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
          margin
        </div>
        {/* Margin Top */}
        <div className="text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-300 py-0.5">
          {marginY}
        </div>

        <div className="flex items-center justify-between gap-1">
          {/* Margin Left */}
          <div className="text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-300 px-1 shrink-0">
            {marginX}
          </div>

          {/* Layer 2: BORDER (Vàng) */}
          <div className="flex-1 bg-yellow-500/15 dark:bg-yellow-950/40 border border-dashed border-yellow-400 dark:border-yellow-600 rounded-md p-1.5 relative text-center min-w-0">
            <div className="absolute left-1 top-0.5 text-[8px] font-mono font-bold text-yellow-600 dark:text-yellow-400 uppercase">
              border
            </div>
            {/* Border Top */}
            <div className="text-[10px] font-mono font-semibold text-yellow-700 dark:text-yellow-300 py-0.5">
              {borderWidth}
            </div>

            <div className="flex items-center justify-between gap-1">
              {/* Border Left */}
              <div className="text-[10px] font-mono font-semibold text-yellow-700 dark:text-yellow-300 px-0.5 shrink-0">
                {borderWidth}
              </div>

              {/* Layer 3: PADDING (Tím) */}
              <div className="flex-1 bg-purple-500/15 dark:bg-purple-950/50 border border-dashed border-purple-400 dark:border-purple-500 rounded p-1.5 relative text-center min-w-0">
                <div className="absolute left-1 top-0.5 text-[8px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                  padding
                </div>
                {/* Padding Top */}
                <div className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 py-0.5">
                  {paddingY}
                </div>

                <div className="flex items-center justify-between gap-1 my-0.5">
                  {/* Padding Left */}
                  <div className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 px-1 shrink-0">
                    {paddingX}
                  </div>

                  {/* Layer 4: CONTENT (Xanh Dương Lõi) */}
                  <div className="flex-1 py-1.5 px-1 bg-blue-500/20 dark:bg-blue-900/60 border border-dashed border-blue-400 dark:border-blue-500 rounded text-center shadow-xs min-w-0">
                    <div className="text-[10px] font-bold text-blue-900 dark:text-blue-200 truncate font-heading px-1">
                      {componentName}
                    </div>
                    <div className="text-[9px] font-mono text-blue-700 dark:text-blue-300 font-semibold truncate">
                      {typeof contentWidth === 'number' ? `${contentWidth}px` : contentWidth} × {typeof contentHeight === 'number' ? `${contentHeight}px` : contentHeight}
                    </div>
                  </div>

                  {/* Padding Right */}
                  <div className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 px-1 shrink-0">
                    {paddingX}
                  </div>
                </div>

                {/* Padding Bottom */}
                <div className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 py-0.5">
                  {paddingY}
                </div>
              </div>

              {/* Border Right */}
              <div className="text-[10px] font-mono font-semibold text-yellow-700 dark:text-yellow-300 px-0.5 shrink-0">
                {borderWidth}
              </div>
            </div>

            {/* Border Bottom */}
            <div className="text-[10px] font-mono font-semibold text-yellow-700 dark:text-yellow-300 py-0.5">
              {borderWidth}
            </div>
          </div>

          {/* Margin Right */}
          <div className="text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-300 px-1 shrink-0">
            {marginX}
          </div>
        </div>

        {/* Margin Bottom */}
        <div className="text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-300 py-0.5">
          {marginY}
        </div>
      </div>
    </div>
  );
};

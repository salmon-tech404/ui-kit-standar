import React from 'react';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { FormInput } from '@/shared/ui';

export const ProjectInfoPanel: React.FC = () => {
  const { tokens, updateToken } = useDesignStore();
  const { project } = tokens;
  const { t } = useI18n();

  return (
    <div className="space-y-4 text-xs">
      <FormInput
        label="Project Name"
        value={project.name}
        onChange={(e) => updateToken('project.name', e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <FormInput
          label="Version"
          value={project.version}
          onChange={(e) => updateToken('project.version', e.target.value)}
          className="font-mono text-center"
        />
        <FormInput
          label="Token Prefix"
          value={project.prefix}
          onChange={(e) => updateToken('project.prefix', e.target.value)}
          placeholder="--ui- or --vx-"
          className="font-mono text-center font-semibold text-orange-600 dark:text-orange-400"
        />
      </div>

      <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 bg-transparent">
        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {t((d) => d.studio.descriptions.projectInfo.title)}
        </div>
        <p className="text-xs font-normal text-slate-600 dark:text-slate-400 leading-relaxed">
          {t((d) => d.studio.descriptions.projectInfo.content)}
        </p>
      </div>
    </div>
  );
};

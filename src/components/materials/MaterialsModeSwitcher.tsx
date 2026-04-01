import MaterialsButton from "@/components/materials/MaterialsButton";
import { materialModeOptions } from "@/data/materials";
import type { MaterialType } from "@/types/materials";

type MaterialsModeSwitcherProps = {
  materialType: MaterialType;
  onChangeMode: (type: MaterialType) => void;
};

export default function MaterialsModeSwitcher({
  materialType,
  onChangeMode,
}: MaterialsModeSwitcherProps) {
  return (
    <div className="grid w-full gap-3 md:grid-cols-2 lg:max-w-2xl">
      {materialModeOptions.map((mode) => (
        <MaterialsButton
          key={mode.type}
          active={materialType === mode.type}
          title={mode.title}
          description={mode.description}
          onClick={() => onChangeMode(mode.type)}
        />
      ))}
    </div>
  );
}

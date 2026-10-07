import { type Dispatch, type SetStateAction } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { useOutletContext } from 'react-router';
import {
  defaultTheme,
  themePresets,
  type ThemeColorKey,
  type ThemeColors,
  type ThemePresetMode,
} from '../theme';

type ThemeContext = {
  theme: ThemeColors;
  setTheme: Dispatch<SetStateAction<ThemeColors>>;
};

const colorOptions: { key: ThemeColorKey; label: string }[] = [
  { key: 'background', label: 'Page background' },
  { key: 'text', label: 'Text color' },
  { key: 'heading', label: 'Header text color' },
  { key: 'sidebar', label: 'Sidebar color' },
];

const presetGroups: { mode: ThemePresetMode; label: string }[] = [
  { mode: 'light', label: 'Light palettes' },
  { mode: 'dark', label: 'Dark palettes' },
];

const Theme = () => {
  const { theme, setTheme } = useOutletContext<ThemeContext>();

  return (
    <div className="page-stack theme-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">APPEARANCE</div>
          <h1>Theme</h1>
          <p>Choose a palette or tune the colors to your workspace.</p>
        </div>
        <button
          className="secondary-button theme-reset"
          type="button"
          onClick={() => setTheme(defaultTheme)}
        >
          <RotateCcw size={14} />
          Reset colors
        </button>
      </div>

      {presetGroups.map(({ mode, label }) => (
        <section
          className="theme-section"
          aria-labelledby={`presets-${mode}-heading`}
          key={mode}
        >
          <div className="theme-section-heading">
            <div>
              <h2 id={`presets-${mode}-heading`}>{label}</h2>
              <p>Apply a coordinated set of colors across the app.</p>
            </div>
          </div>
          <div className="theme-preset-grid">
            {themePresets
              .filter((preset) => preset.mode === mode)
              .map(({ name, colors }) => {
                const isSelected = Object.keys(colors).every(
                  (key) =>
                    colors[key as keyof ThemeColors] ===
                    theme[key as keyof ThemeColors],
                );
                return (
                  <button
                    key={name}
                    className={`theme-preset${isSelected ? ' selected' : ''}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setTheme(colors)}
                  >
                    <span
                      className="theme-preview"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.text + '35',
                      }}
                    >
                      <span
                        className="theme-preview-sidebar"
                        style={{ backgroundColor: colors.sidebar }}
                      />
                      <span className="theme-preview-content">
                        <i style={{ backgroundColor: colors.heading }} />
                        <i style={{ backgroundColor: colors.accent }} />
                        <i style={{ backgroundColor: colors.surface }} />
                      </span>
                    </span>
                    <span className="theme-preset-meta">
                      <span>{name}</span>
                      {isSelected && <Check size={15} aria-label="Selected" />}
                    </span>
                  </button>
                );
              })}
          </div>
        </section>
      ))}

      <section className="theme-section" aria-labelledby="customize-heading">
        <div className="theme-section-heading">
          <div>
            <h2 id="customize-heading">Custom colors</h2>
            <p>Adjust each color independently.</p>
          </div>
        </div>
        <div className="theme-color-list">
          {colorOptions.map(({ key, label }) => (
            <label className="theme-color-row" key={key}>
              <span>
                <strong>{label}</strong>
                <small>{theme[key].toUpperCase()}</small>
              </span>
              <input
                aria-label={label}
                type="color"
                value={theme[key]}
                onChange={(event) =>
                  setTheme((current) => ({
                    ...current,
                    [key]: event.target.value,
                  }))
                }
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Theme;

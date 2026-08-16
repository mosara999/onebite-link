import TimerSettingInput from "@/components/TimerSettingInput";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-6 dark:bg-black">
      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Setting
      </h3>
      <TimerSettingInput />
    </div>
  );
}

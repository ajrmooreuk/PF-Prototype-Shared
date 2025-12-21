import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';

interface ThemeTabsProps {
  activeTheme: string;
  onThemeChange: (theme: string) => void;
  themeCounts: {
    all: number;
    educate: number;
    engage: number;
    entertain: number;
    empower: number;
  };
}

const themeDescriptions: any = {
  all: 'View all content ideas across themes',
  educate: 'Educational content that teaches and informs',
  engage: 'Content that starts conversations and drives interaction',
  entertain: 'Fun, relatable content that delights your audience',
  empower: 'Inspirational content that motivates and uplifts',
};

export function ThemeTabs({ activeTheme, onThemeChange, themeCounts }: ThemeTabsProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
      <Tabs value={activeTheme} onValueChange={onThemeChange}>
        <TabsList className="bg-transparent gap-2 h-auto p-0">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white h-14 px-6 rounded-lg"
            style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
          >
            All Ideas
            <span className="ml-2 opacity-75">({themeCounts.all})</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="educate"
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white h-14 px-6 rounded-lg"
            style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
          >
            📚 Educate
            <span className="ml-2 opacity-75">({themeCounts.educate})</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="engage"
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white h-14 px-6 rounded-lg"
            style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
          >
            💬 Engage
            <span className="ml-2 opacity-75">({themeCounts.engage})</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="entertain"
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white h-14 px-6 rounded-lg"
            style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
          >
            🎉 Entertain
            <span className="ml-2 opacity-75">({themeCounts.entertain})</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="empower"
            className="data-[state=active]:bg-[#02a4bf] data-[state=active]:text-white h-14 px-6 rounded-lg"
            style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 }}
          >
            💪 Empower
            <span className="ml-2 opacity-75">({themeCounts.empower})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <p
        className="text-[#6B7280] italic mt-4"
        style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
      >
        {themeDescriptions[activeTheme]}
      </p>
    </div>
  );
}

import PageShell from "./PageShell";

type GameShellProps = {
  children: React.ReactNode;
  tone?: "sky" | "amber" | "violet";
};

// Halaman game = PageShell dengan tombol kembali ke menu Main
export default function GameShell({ children, tone = "sky" }: GameShellProps) {
  return (
    <PageShell tone={tone} backHref="/main">
      {children}
    </PageShell>
  );
}

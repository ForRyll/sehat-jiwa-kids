import PageShell, { PageTone } from "./PageShell";

type GameShellProps = {
  children: React.ReactNode;
  tone?: PageTone;
};

// Halaman game = PageShell dengan tombol kembali ke menu Main
export default function GameShell({ children, tone = "sky" }: GameShellProps) {
  return (
    <PageShell tone={tone} backHref="/main">
      {children}
    </PageShell>
  );
}

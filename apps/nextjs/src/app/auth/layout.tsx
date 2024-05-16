export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-emerald-700">
      {props.children}
    </div>
  );
}

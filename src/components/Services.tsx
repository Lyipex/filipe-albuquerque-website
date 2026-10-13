const services = [
  ["Landing pages", "Uma oferta, uma página, um próximo passo claro."],
  ["Sites institucionais", "Seu negócio e seus serviços bem apresentados."],
  ["Redesign e melhorias", "Mais clareza, usabilidade e responsividade para seu site."],
];

export default function Services() {
  return (
    <ul id="servicos" aria-label="Serviços" className="mt-6 border-t border-rule">
      {services.map(([title, description], index) => (
        <li key={title} className="flex gap-4 border-b border-rule py-4">
          <span aria-hidden="true" className="pt-1 text-xs text-moss">0{index + 1}</span>
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-ink/80">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

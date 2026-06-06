/* eslint-disable @typescript-eslint/no-explicit-any */
export function renderCpfResults(res: any): string {
  const data = res.data?.data;
  if (!data) return '';
  const html: string[] = [];
  const basicos = data.dadosBasicos;
  const foto = data.fotos?.data?.[0]?.base64 ?? null;

  html.push(`
    <div class="section-card p-10 flex flex-col md:flex-row gap-10 items-center">
      <div class="w-44 h-52 rounded-2xl border border-white border-opacity-10 overflow-hidden bg-black bg-opacity-40 flex-shrink-0 shadow-sm relative group">
        ${foto ? `<img src="data:image/jpeg;base64,${foto}" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center opacity-20"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>`}
      </div>
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
        <div class="sm:col-span-2 lg:col-span-3">
          <p class="data-label text-blue-500">NOME COMPLETO</p>
          <h2 class="font-syne text-2xl font-bold uppercase">${basicos.nome}</h2>
        </div>
        <div><p class="data-label">CPF</p><p class="data-value">${basicos.cpf}</p></div>
        <div><p class="data-label">NASCIMENTO</p><p class="data-value">${basicos.dataNasc}</p></div>
        <div><p class="data-label">SEXO</p><p class="data-value">${basicos.sexo}</p></div>
        <div><p class="data-label">SCORE</p><p class="data-value text-blue-500 font-black">${basicos.faixaScore || '---'}</p></div>
        <div><p class="data-label">RENDA ESTIMADA</p><p class="data-value">R$ ${basicos.rendaAtual || '---'}</p></div>
        <div><p class="data-label">SITUAÇÃO RFB</p><p class="data-value text-green-500 font-bold">${basicos.situacaoCadastral?.descricaoSit}</p></div>
        <div class="sm:col-span-2"><p class="data-label">FILIAÇÃO (MÃE)</p><p class="data-value">${basicos.filiacao?.nomeMae}</p></div>
        <div><p class="data-label">FILIAÇÃO (PAI)</p><p class="data-value">${basicos.filiacao?.nomePai}</p></div>
      </div>
    </div>
  `);

  if (basicos.biometria?.length > 0) {
    const bio = basicos.biometria[0];
    html.push(`<div class="section-card"><div class="section-title">Características Físicas (Biometria)</div><div class="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
      <div><p class="data-label">Cor da Pele</p><p class="data-value">${bio.peleCor}</p></div>
      <div><p class="data-label">Altura</p><p class="data-value">${bio.altura}</p></div>
      <div><p class="data-label">Peso</p><p class="data-value">${bio.peso}</p></div>
    </div></div>`);
  }

  if (data.enderecos?.length > 0) {
    html.push(`<div class="section-card"><div class="section-title">Localização e Endereços</div><div class="overflow-x-auto"><table class="w-full"><thead><tr>
      <th class="table-header">Logradouro</th><th class="table-header">Nº</th><th class="table-header">Bairro</th><th class="table-header">Cidade/UF</th><th class="table-header">CEP</th>
    </tr></thead><tbody>${data.enderecos.map((e: any) => `<tr><td class="table-cell">${e.logradouro}</td><td class="table-cell">${e.numero}</td><td class="table-cell">${e.bairro}</td><td class="table-cell">${e.cidade}/${e.siglaUf}</td><td class="table-cell">${e.cep}</td></tr>`).join('')}</tbody></table></div></div>`);
  }

  if (data.telefonesHistorico?.length > 0 || data.emails?.length > 0) {
    html.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      ${data.telefonesHistorico ? `<div class="section-card mb-0"><div class="section-title">Telefones</div><div class="p-6 space-y-3">${data.telefonesHistorico.map((t: any) => `<div class="bg-black bg-opacity-30 p-4 rounded-2xl flex justify-between"><span class="font-bold">(${t.ddd}) ${t.telefone}</span></div>`).join('')}</div></div>` : ''}
      ${data.emails ? `<div class="section-card mb-0"><div class="section-title">E-mails</div><div class="p-6 space-y-3">${data.emails.map((m: any) => `<div class="bg-black bg-opacity-30 p-4 rounded-2xl"><span class="text-sm">${m.email}</span></div>`).join('')}</div></div>` : ''}
    </div>`);
  }

  if (data.parentesNovos?.length > 0) {
    html.push(`<div class="section-card"><div class="section-title">Vínculos Familiares</div><div class="overflow-x-auto"><table class="w-full"><tbody>
      ${data.parentesNovos.map((p: any) => `<tr><td class="table-cell font-bold">${p.nome}</td><td class="table-cell">${p.cpf}</td><td class="table-cell">${p.tipoRelacao}</td></tr>`).join('')}
    </tbody></table></div></div>`);
  }

  if (data.empregos?.length > 0) {
    html.push(`<div class="section-card"><div class="section-title">Histórico Profissional</div><div class="overflow-x-auto"><table class="w-full"><tbody>
      ${data.empregos.map((e: any) => `<tr><td class="table-cell">${e.razaoSocial !== 'Não Informado' ? e.razaoSocial : 'CNPJ: ' + e.cnpjEmpregador}</td><td class="table-cell">${e.descricaoCbo}</td><td class="table-cell">R$ ${e.valorSalarial}</td></tr>`).join('')}
    </tbody></table></div></div>`);
  }

  return html.join('');
}

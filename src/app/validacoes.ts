import { AbstractControl } from "@angular/forms";

export class Validacoes {
  // validador
  static MaiorQue18Anos(controle: AbstractControl) {
    const data:any = controle.value;
    const [ano, mes, dia] = data.split('-')
    const hoje = new Date();
    const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
    const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 18; //18 anos em mili segundos...

    if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
      return null;
    // nome do erro
    return { menorDeIdade: true };
  }
}

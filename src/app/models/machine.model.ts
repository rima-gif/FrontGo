import { radioFrequency } from "./RadioFrequency.model";

export class Machine {
  id?: number;
  name: string;
  radioFrequencyId: number;
  radioFrequency!: radioFrequency;

  // Assurez-vous que radioFrequency vient après les paramètres obligatoires
  constructor(name: string, radioFrequencyId: number, radioFrequency: radioFrequency, id?: number) {
    this.name = name;
    this.radioFrequencyId = radioFrequencyId;
    this.radioFrequency = radioFrequency;
    if (id) {
      this.id = id;
    }
  }
}

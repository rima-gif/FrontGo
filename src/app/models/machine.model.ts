import { radioFrequency } from "./RadioFrequency.model";

export class Machine {
  id?: number;
  name: string;
  radioFrequency: {
    id: number;
    uid: string;
  };
  processed?: boolean;
  missionId?: number;

  constructor(
    name: string,
    radioFrequency: radioFrequency,
    id: number,
    processed?: boolean,
    missionId?: number
  ) {
    this.name = name;
    this.radioFrequency = radioFrequency;
    if (id) this.id = id;
    if (processed !== undefined) this.processed = processed;
    if (missionId) this.missionId = missionId;
  }
}
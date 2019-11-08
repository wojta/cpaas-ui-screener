export enum EStatus {
  SUCCEDED,
  RUNNING,
  FAILED
}

export const getStatusText=(status:EStatus)=>{
  switch (status) {
    case EStatus.SUCCEDED:return "Succeeded"
    case EStatus.RUNNING:return "Running"
    case EStatus.FAILED:return "Failed"
  }
}


export interface IProductPipeline {
  name: string;
  lastRun: string;
  status: EStatus;
  taskStatus: number;
  duration:number;
 }


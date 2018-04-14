export class reciept { 
    constructor (
		public recieptID?: number,
		public day?: any,
		public store?: string, 
		public amount?: number, 
		public category?: string,
		public tag?: any,
		public sharedWith?: any,
	){}
}


function myWorker(_job) {
 return new Promise(resolve => {
   // simulando algum processo demorado
   setTimeout(() => {
     console.log(new Date(), _job);
     resolve(_job);
     
   }, 1000)
 })
}

class Queue{

	constructor(myWorker){
		this.myWorker = myWorker;
		this.jobs = [];
	}

	addJobs(job){
		this.jobs.push(job);
		this.processQueue(this.jobs[0]);	
	}

	removeJob(id){
		this.jobs.filter((element,index) => { 
			if (element.id === id ) {
				console.log('remove job from queue ... ');
				this.jobs.splice(index, 1);
				console.log('job removed successfully!');
				this.getJobs(); 
			}
		});
				
		//remove first element
		//this.jobs.shift();	
	}

	removeAllJobs(){
		this.jobs = [];
	}

	getJobs(){
		console.log('jobs in queue: ', this.jobs);
		return this.jobs;
	}

	async processQueue (job) {
		const process = await this.myWorker(job);
		if(process){
			this.removeJob(job.id);
			if(this.jobs.length > 0){
				const [first] = this.jobs;
			 	this.processQueue(first);
			}
		}
	}
}

const queue = new Queue(myWorker);

// objeto job
const job = {
 id: 1,
 payload: {
    filename: 'file1.txt',
    body: 'exemplo de conteudo 1'
 }
}
queue.addJobs(job);

/*const job2 = {
 id: 2,
 payload: {
    filename: 'file2.txt',
    body: 'exemplo de conteudo 2'
 }
}
queue.addJobs(job2);

const job3 = {
 id: 3,
 payload: {
    filename: 'file3.txt',
    body: 'exemplo de conteudo 3'
 }
}
queue.addJobs(job3);*/

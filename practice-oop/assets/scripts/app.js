
class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
        activeProjectList.setSwitchHandler(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList));
        document.getElementById('start-analitics-btn').addEventListener('click', this.startAnalytics)
        // const timerId = setTimeout(this.startAnalytics, 3000)

        document.getElementById('stop-analitics-btn').addEventListener('click', () => {
           
            console.log('Adalytics STOPED')
            clearTimeout(timerId) 
        })

    }

    static startAnalytics() {
        const analiticsScript = document.createElement('script');
        analiticsScript.src = 'assets/scripts/Analytics.js'
        analiticsScript.defer = 'true';
        document.head.append(analiticsScript);
    }
}

App.init()
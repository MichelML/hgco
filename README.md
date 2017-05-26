<br>
<img src='https://raw.githubusercontent.com/MichelML/hgco/master/hgco.png' width='100'>
<br>
<a href="https://badge.fury.io/js/hgco"><img src="https://badge.fury.io/js/hgco.svg" alt="npm version" height="18"></a>

# How it works  
_hgco_ simply looks up at your current branch name, and if it contains a JIRA issue key, it adds it at the end of your commit message.  
  
In any other case, _hgco_ throws and your commit is canceled.  
  
# Install  
```  
npm install -g hgco  
```  

# How to use  
```bash
hgco -m 'your commit message' # converts to "hg commit -m 'your commit message [<your JIRA issue key>]'"
``` 

# Maintainer  
Michel Moreau - [michmoreau.l@gmail.com](mailto:michmoreau.l@gmail.com?Subject=hgco%20Project) 

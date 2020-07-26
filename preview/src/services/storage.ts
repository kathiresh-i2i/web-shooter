
export class StorageService {
    public static $inject: string[] = ['$q']
    constructor(private $q: angular.IQService) {}

    fetchRecentFiles(recentFile: string, cb) {
         DiskStorage.GetLastSelectedFile(recentFile, function(file){
                console.log("...FILE");
                cb(file);
         });
    }
 


}
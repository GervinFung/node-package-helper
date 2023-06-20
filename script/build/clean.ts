import fs from 'fs';

const main = () => {
   if (fs.existsSync('build')) {
      fs.unlinkSync('build');
   }
};

main();

import nextConnect from 'next-connect';
import multer from 'multer';

// Set up multer to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Folder to save the files
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('proofFile'));

apiRoute.post((req, res) => {
  const { schoolName, problem, areaOfProblem, stepsTaken } = req.body;
  const proofFile = req.file;

  // Here, you can save the data to a database if needed

  res.status(200).json({
    message: 'Form submitted successfully!',
    data: {
      schoolName,
      problem,
      areaOfProblem,
      stepsTaken,
      proofFile: proofFile.path,
    },
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, so `multer` can handle the file uploads
  },
};

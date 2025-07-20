import AWS from 'aws-sdk';
import fs from 'fs';

// Suppress maintenance mode warning
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});

const s3 = new AWS.S3();

export const uploadVideo = async (file: Express.Multer.File): Promise<string> => {
  try {
    const fileContent = fs.readFileSync(file.path);
    const fileName = `videos/${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
      Body: fileContent,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const result = await s3.upload(params).promise();
    
    // Clean up temporary file
    fs.unlinkSync(file.path);
    
    return result.Location;
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error('Failed to upload video');
  }
};

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  try {
    const fileContent = fs.readFileSync(file.path);
    const fileName = `images/${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
      Body: fileContent,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const result = await s3.upload(params).promise();
    
    // Clean up temporary file
    fs.unlinkSync(file.path);
    
    return result.Location;
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error('Failed to upload image');
  }
};

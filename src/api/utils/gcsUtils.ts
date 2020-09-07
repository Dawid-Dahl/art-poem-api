import {Bucket} from "@google-cloud/storage";

export const deleteGCSFile = async (bucket: Bucket, name: string) => {
	await bucket.file(name).delete();

	console.log(`gs://${bucket.name}/${name} deleted.`);
};

export const getGSCfilename = (filename: string, bucketName: string): string =>
	filename.split(`${bucketName}/`)[1];

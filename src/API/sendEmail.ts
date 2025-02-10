import request from "@/config/request.ts";

export default function sendEmail(data: {
	name: string;
	email: string;
	message: string;
}) {
	return request({
		url: `/api/sendemail`,
		method: "POST",
		data,
	});
}

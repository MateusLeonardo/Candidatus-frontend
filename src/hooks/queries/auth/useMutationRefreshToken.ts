// export function useRefreshToken() {
//   const router = useRouter();

//   return useMutation<
//     IResponseToken,
//     AxiosError<IResponseError>,
//     IRequestRefreshToken
//   >({
//     mutationFn: async (data: IRequestRefreshToken) => {
//       const response = await api.post<IResponseToken>("/refresh-token", data);
//       return response.data;
//     },
//     onSuccess: (data: IResponseToken) => {
//       Cookies.set("access_token", data.accessToken, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//       });
//       Cookies.set("refresh_token", data.refreshToken, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//       });
//     },
//     onError: (error: AxiosError<IResponseError>) => {
//       Cookies.remove("access_token");
//       Cookies.remove("refresh_token");
//       useToastError(error);
//       router.push("/login");
//     },
//   });
// }

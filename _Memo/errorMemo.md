# JsonWebTokenError

`[0] JsonWebTokenError: jwt must be provided`

- 새로고침시 refreshToken을 백엔드 던져서, 새 accessToken을 발급 받는 과정에서 발생한 에러
- jwt가 백엔드에 전송되지 않았다! 라는 구문

## 원인

- 로그인을 하지 않은 상태(refreshToken이 cookie에 저장되지 않은 상태)에서 새로고침을 시도

## 해결

- 로그인을 하시고, 새로고침을 하시면 해당 에러 메시지는 나타나지 않을거예요!

## ref

> https://www.inflearn.com/questions/857829/jwt-must-be-provided-%EC%98%A4%EB%A5%98

> 해당 에러 메시지는 백엔드에서 보내는 메시지이므로, 프론트엔드에서는 무시하셔도 될 것 같습니다!

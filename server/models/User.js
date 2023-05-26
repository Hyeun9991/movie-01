const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt가 몇 글자인지 정의

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 공백 없앰
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // 토큰  유효기간
    type: Number,
  },
});

// 회원가입 중 client에서 전달한 body를 DB에 저장하기 전에 실행되는 코드
userSchema.pre('save', function (next) {
  var user = this;

  // User Model안 field중에 password가 변환 될 때만 실행
  if (user.isModified('password')) {
    // 비밀번호를 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      // user.password: 플레인 비밀번호 / hash: 암호화된 비밀번호
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호 확힌 메소드
userSchema.methods.comparePassword = async function (plainPassword) {
  const user = this; // this = userSchema
  try {
    return await bcrypt.compare(plainPassword, user.password);
  } catch (err) {
    throw new Error(err);
  }
};

// 토큰 생성 메소드
userSchema.methods.generateToken = async function () {
  const user = this;

  // 현재 시간에 12시간을 더한 만료 시간 설정
  const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // 12시간 (12 * 60 * 60 * 1000 milliseconds)

  // 비밀 키를 사용하여 JWT를 생성하고 만료 시간(expirationTime) 설정
  const token = jwt.sign(
    { userId: user._id.toHexString(), exp: expirationTime },
    'secretToken'
  );

  user.token = token;
  user.tokenExp = expirationTime;
  await user.save();

  return token;
};

// 토큰 복호화 메소드
userSchema.statics.findByToken = async function (token) {
  const user = this;

  // 유저 아이디를 이용해서 유저를 찾은 다음에
  // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

  try {
    // 비밀 키를 사용하여 JWT를 복호화
    const decoded = jwt.verify(token, 'secretToken');
    const foundUser = await user.findOne({ _id: decoded.userId, token: token });
    return foundUser;
  } catch (err) {
    throw err;
  }
};

// model로 schema 감싸기
const User = mongoose.model('User', userSchema);

module.exports = { User };

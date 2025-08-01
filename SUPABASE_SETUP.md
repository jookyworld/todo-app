# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트가 생성되면 Settings > API에서 URL과 anon key를 확인합니다.

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

실제 값으로 교체하세요:

- `your_supabase_url_here`: Supabase 프로젝트 URL
- `your_supabase_anon_key_here`: Supabase anon key

## 3. 데이터베이스 테이블 생성

Supabase Dashboard에서 SQL Editor를 열고 다음 SQL을 실행하세요:

```sql
-- todos 테이블 생성
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,  -- 자동 증가하는 정수 ID
  text TEXT NOT NULL,
  check BOOLEAN DEFAULT FALSE,
  start_time TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) 활성화
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽고 쓸 수 있도록 정책 설정 (개발용)
CREATE POLICY "Allow all operations" ON todos FOR ALL USING (true) WITH CHECK (true);
```

## 4. 사용법

환경 변수를 설정한 후 애플리케이션을 실행하면 Supabase와 연결됩니다.

## 주의사항

- `.env.local` 파일은 `.gitignore`에 추가되어 있어 Git에 커밋되지 않습니다.
- 프로덕션에서는 적절한 RLS 정책을 설정해야 합니다.

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_03_27_052103) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title", null: false
    t.string "image"
    t.text "introduction"
    t.string "location"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "resume_comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "resume_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["resume_id"], name: "index_resume_comments_on_resume_id"
    t.index ["user_id"], name: "index_resume_comments_on_user_id"
  end

  create_table "resume_items", force: :cascade do |t|
    t.string "content"
    t.integer "position"
    t.bigint "resume_section_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["resume_section_id"], name: "index_resume_items_on_resume_section_id"
  end

  create_table "resume_likes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "resume_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["resume_id"], name: "index_resume_likes_on_resume_id"
    t.index ["user_id"], name: "index_resume_likes_on_user_id"
  end

  create_table "resume_sections", force: :cascade do |t|
    t.string "title"
    t.integer "position"
    t.bigint "resume_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["resume_id"], name: "index_resume_sections_on_resume_id"
  end

  create_table "resumes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title", null: false
    t.string "profile_image"
    t.integer "age"
    t.string "gender"
    t.string "sns_url"
    t.string "location"
    t.text "introduction"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_resumes_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.boolean "is_done"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "events", "users"
  add_foreign_key "resume_comments", "resumes"
  add_foreign_key "resume_comments", "users"
  add_foreign_key "resume_items", "resume_sections"
  add_foreign_key "resume_likes", "resumes"
  add_foreign_key "resume_likes", "users"
  add_foreign_key "resume_sections", "resumes"
  add_foreign_key "resumes", "users"
end

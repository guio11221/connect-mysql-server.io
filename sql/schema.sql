CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(128) COLLATE utf8mb4_bin NOT NULL,
  expires INT(11) UNSIGNED NOT NULL,
  data MEDIUMTEXT COLLATE utf8mb4_bin,
  ip_address VARCHAR(45) COLLATE utf8mb4_bin DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Adicione a coluna `created_at`
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Adicione a coluna `updated_at`
  PRIMARY KEY (session_id)
) ENGINE=InnoDB;

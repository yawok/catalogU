resource "azurerm_resource_group" "cc_lab" {
	name = "cloud_computing_lab1-rg"
	location = var.location
}

resource "azurerm_cosmosdb_account" "cosmosdb_account" {
  name = "catalogu-db-account"
  location = var.location
  resource_group_name = azurerm_resource_group.cc_lab.name
  offer_type = "Standard"
  kind = "GlobalDocumentDB"
  geo_location {
    location          = var.location
    failover_priority = 0
  }
  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }
  depends_on = [
    azurerm_resource_group.cc_lab
  ]
}

resource "azurerm_cosmosdb_sql_database" "catalogUDb" {
  name                = "catalogu-db-cosmosdb-sqldb"
  resource_group_name = azurerm_resource_group.cc_lab.name
  account_name        = azurerm_cosmosdb_account.cosmosdb_account.name
}

resource "azurerm_cosmosdb_sql_container" "catalogUDb_container" {
  name                  = "catalogu-db-sql-container"
  resource_group_name   = azurerm_resource_group.cc_lab.name
  account_name          = azurerm_cosmosdb_account.cosmosdb_account.name
  database_name         = azurerm_cosmosdb_sql_database.catalogUDb.name
  partition_key_paths   = ["/definition/id"]
  partition_key_version = 1

  indexing_policy {
    indexing_mode = "consistent"

    included_path {
      path = "/*"
    }

    included_path {
      path = "/included/?"
    }

    excluded_path {
      path = "/excluded/?"
    }
  }

  unique_key {
    paths = ["/definition/idlong", "/definition/idshort"]
  }
}

resource "azurerm_service_plan" "app_service_plan" {
  name = "app-service-plan"
  resource_group_name = azurerm_resource_group.cc_lab.name
  location = var.location
  os_type = "Linux"
  sku_name = "B1"
}

resource "azurerm_linux_web_app" "catalogUApp" {
	name = "catalogu"
	resource_group_name = azurerm_resource_group.cc_lab.name
	location = var.location
	service_plan_id = azurerm_service_plan.app_service_plan.id

	site_config {}
}
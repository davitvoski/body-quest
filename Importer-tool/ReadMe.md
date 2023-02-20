# Setup Importer
<p>
To set up the Importer tool to import the dataset, open the Importer-tool in an IDE. <br>

Add a Variables.java in org/teamc/bodyquest to setup the database URL string for connecting. <br>

- Add a <b>public static final String USER variable </b>: which is the username for the MongoDB database user

- Add a <b>public static final String PASSWORD variable </b>: which is the password of the user for the MongoDB database user

There are two options:
1. A ScriptMain which a simple script that setups the exercises collection for you with Ascending indexes on name, target, equipment.
2. A GuiMain which is a gui where you have more control of the creation and deletion of the collection.

<b> Note you should check the permissions of the database user.</b>
</p>
